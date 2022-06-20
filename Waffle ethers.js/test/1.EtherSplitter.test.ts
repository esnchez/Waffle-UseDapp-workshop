import {expect, use} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import {EtherSplitter, EtherSplitter__factory} from '../build/types';

use(solidity);

describe('Ether Splitter', () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let splitter: EtherSplitter;

  beforeEach(async () => {
    splitter = await deployContract(alice, EtherSplitter__factory, [bob.address, charlie.address]);
  });

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  });

  it('Check balances first and after sending ether', async () => {
    expect(await bob.getBalance(0));
    expect(await charlie.getBalance(0));
    expect(await alice.getBalance(0));

    // await alice.receiveFundsAndSplit({value: 123});
    await splitter.receiveFundsAndSplit({value:3});
    expect(await bob.getBalance(1));
    expect(await charlie.getBalance(1));
    expect(await alice.getBalance(1));

    await expect(splitter.receiveFundsAndSplit({value:3}))
    .to.emit(splitter, 'FundsSplit')
    .withArgs(bob.address,1);

    await expect(splitter.receiveFundsAndSplit({value:3}))
    .to.emit(splitter, 'FundsSplit')
    .withArgs(charlie.address,1);

    await expect(splitter.receiveFundsAndSplit({value:3}))
    .to.emit(splitter, 'RemainderReturned')
    .withArgs(alice.address,1);



    // expect(await bob.getBalance(contract.address)).to.eq(1)
  });

  it('Check events', async () => {
    await expect(splitter.receiveFundsAndSplit({value:3}))
    .to.emit(splitter, 'FundsSplit')
    .withArgs(bob.address,1);

    await expect(splitter.receiveFundsAndSplit({value:3}))
    .to.emit(splitter, 'FundsSplit')
    .withArgs(charlie.address,1);

    await expect(splitter.receiveFundsAndSplit({value:3}))
    .to.emit(splitter, 'RemainderReturned')
    .withArgs(alice.address,1);
  });
});
