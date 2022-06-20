import {expect, use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import {TokenSplitter, TokenSplitter__factory, WaffleToken, WaffleToken__factory} from '../build/types';

use(solidity);

describe('Token Splitter', () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let token: WaffleToken;
  let splitter: TokenSplitter;

  //instead of using beforeEach, we can use a fixture, took a photo.
  

  beforeEach(async () => {
    token = await deployContract(alice, WaffleToken__factory, [1000]);
    splitter = await deployContract(alice, TokenSplitter__factory, [token.address, [charlie.address, bob.address]]);
  });

  it('Deploys correctly', async () => {
    expect(splitter.address).to.be.properAddress
    expect(await splitter.token()).to.be.equal(token.address)
  });

  it('Split is good working', async () => {
    expect(await token.balanceOf(bob.address)).to.eq(0)
    expect(await token.balanceOf(charlie.address)).to.eq(0)
    await expect(token.approve(splitter.address,10)).not.to.be.reverted;
    await expect(splitter.split(10)).not.to.be.reverted;
    expect(await token.balanceOf(charlie.address)).to.eq(5)
  })

  it('Makes some spending on someone elses behalf', async () => {
    await token.approve(charlie.address,100);
    const charlieWallet = await token.connect(charlie);
    await charlieWallet.transferFrom(alice.address, bob.address, 50);
    expect(await token.balanceOf(bob.address)).to.eq(50)
    expect(await token.allowance(alice.address, charlie.address)).to.eq(50)
    expect(await token.balanceOf(charlie.address)).to.eq(0)
    expect(await token.balanceOf(alice.address)).to.eq(950)
  })

  // const bad = () => {
  //   throw new Error('some error')
  // }

  // it('', async () => {
  //   const fun = () => bad()
  //   await expect(fun).to.throw
  // })

});
// });
