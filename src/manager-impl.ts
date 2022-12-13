import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  DAODeployed as DAODeployedEvent,
  //   Initialized as InitializedEvent,
  //   OwnerCanceled as OwnerCanceledEvent,
  //   OwnerPending as OwnerPendingEvent,
  //   OwnerUpdated as OwnerUpdatedEvent,
  //   UpgradeRegistered as UpgradeRegisteredEvent,
  //   UpgradeRemoved as UpgradeRemovedEvent,
  //   Upgraded as UpgradedEvent
} from "../generated/ManagerImpl/ManagerImpl";

import {
  Token as TokenContractInstance,
  Token__getFoundersResultValue0Struct,
} from "../generated/ManagerImpl/Token";
import { Auction as AuctionContractInstance } from "../generated/ManagerImpl/Auction";
import { MetadataRenderer as MetadataContractInstance } from "../generated/ManagerImpl/MetadataRenderer";
import { Governor as GovernorContractInstance } from "../generated/ManagerImpl/Governor";
import { Treasury as TreasuryContractInstance } from "../generated/ManagerImpl/Treasury";

import {
  Account,
  AuctionContract,
  DAO,
  FounderInfo,
  GovernorContract,
  MetadataContract,
  TokenContract,
  TreasuryContract,
  //   DAODeployed,
  //   Initialized,
  //   OwnerCanceled,
  //   OwnerPending,
  //   OwnerUpdated,
  //   UpgradeRegistered,
  //   UpgradeRemoved,
  //   Upgraded
} from "../generated/schema";

import { ZERO_ADDRESS } from "../utils/constants";

export function findOrCreateAccount(userAddress: string): Account {
  let account = Account.load(userAddress);
  if (account === null) {
    account = new Account(userAddress);
    account.save();
  }
  return account;
}

export function handleFounders(
  founders: Token__getFoundersResultValue0Struct[],
  tokenContract: TokenContract
): void {
  const foundersLength = founders.length;
  for (let i = 0; i < foundersLength; i++) {
    // }
    // founders.forEach((founder) => {
    const founderAddr = founders[i].wallet.toHexString();
    const founderAccount = findOrCreateAccount(founderAddr);
    const ownershipPercentage = founders[i].ownershipPct;
    const vestExpiry = founders[i].vestExpiry;
    const founderIdString = `${tokenContract.id}-${founderAddr}`;
    let newFounderInfo = new FounderInfo(founderIdString);
    newFounderInfo.ownershipPercentage = BigInt.fromI32(ownershipPercentage);
    newFounderInfo.vestExpiry = vestExpiry;
    newFounderInfo.account = founderAccount.id;
    newFounderInfo.tokenContract = tokenContract.id;
    newFounderInfo.save();
  }
  // );
}

export function handleNewDAO(event: DAODeployedEvent): void {
  // format addresses
  let tokenAddr = event.params.token.toHexString();
  const auctionAddr = event.params.auction.toHexString();
  const metadataAddr = event.params.metadata.toHexString();
  const governorAddr = event.params.governor.toHexString();
  const treasuryAddr = event.params.treasury.toHexString();

  // init DAO entity & save
  let newDAO = new DAO(`DAO-${tokenAddr}`);
  newDAO.save();

  // init instances of DAO contracts so that we can call them (initialization doesn't emit events)
  const tokenDeployment = TokenContractInstance.bind(
    Address.fromString(tokenAddr)
  );
  const auctionDeployment = AuctionContractInstance.bind(
    Address.fromString(auctionAddr)
  );
  const metadataDeployment = MetadataContractInstance.bind(
    Address.fromString(metadataAddr)
  );
  const governorDeployment = GovernorContractInstance.bind(
    Address.fromString(governorAddr)
  );
  const treasuryDeployment = TreasuryContractInstance.bind(
    Address.fromString(treasuryAddr)
  );

  let newTokenContract = new TokenContract(tokenAddr);
  newTokenContract.DAO = newDAO.id;
  newTokenContract.name = tokenDeployment.name();
  newTokenContract.symbol = tokenDeployment.symbol();
  newTokenContract.contractURI = tokenDeployment.contractURI();
  newTokenContract.totalSupply = tokenDeployment.totalSupply();
  newTokenContract.save();
  const founders = tokenDeployment.getFounders();
  handleFounders(founders, newTokenContract);

  let newAuctionContract = new AuctionContract(auctionAddr);
  newAuctionContract.DAO = newDAO.id;
  newAuctionContract.duration = auctionDeployment.duration();
  newAuctionContract.reservePrice = auctionDeployment.reservePrice();
  newAuctionContract.timeBuffer = auctionDeployment.timeBuffer();
  newAuctionContract.minBidIncrement = auctionDeployment.minBidIncrement();
  newAuctionContract.paused = auctionDeployment.paused();
  newAuctionContract.save();

  let newMetadataContract = new MetadataContract(metadataAddr);
  newMetadataContract.DAO = newDAO.id;
  newMetadataContract.websiteURL = metadataDeployment.projectURI();
  newMetadataContract.description = metadataDeployment.description();
  newMetadataContract.contractImage = metadataDeployment.contractImage();
  newMetadataContract.rendererBase = metadataDeployment.rendererBase();
  newMetadataContract.save();

  let newGovernorContract = new GovernorContract(governorAddr);
  newGovernorContract.DAO = newDAO.id;
  const vetoer = governorDeployment.vetoer();
  newGovernorContract.vetoerAddress = vetoer;
  newGovernorContract.vetoEnabled = vetoer !== ZERO_ADDRESS;
  newGovernorContract.proposalThreshold = governorDeployment.proposalThresholdBps();
  newGovernorContract.quoromThreshold = governorDeployment.quorumThresholdBps();
  newGovernorContract.votingDelay = governorDeployment.votingDelay();
  newGovernorContract.votingPeriod = governorDeployment.votingPeriod();
  newGovernorContract.save();

  let newTreasuryContract = new TreasuryContract(treasuryAddr);
  newTreasuryContract.DAO = newDAO.id;
  newTreasuryContract.delay = treasuryDeployment.delay();
  newTreasuryContract.gracePeriod = treasuryDeployment.gracePeriod();
  newTreasuryContract.save();
}

// export function handleDAODeployed(event: DAODeployedEvent): void {
//   let entity = new DAODeployed(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.token = event.params.token
//   entity.metadata = event.params.metadata
//   entity.auction = event.params.auction
//   entity.treasury = event.params.treasury
//   entity.governor = event.params.governor

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleInitialized(event: InitializedEvent): void {
//   let entity = new Initialized(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.version = event.params.version

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnerCanceled(event: OwnerCanceledEvent): void {
//   let entity = new OwnerCanceled(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.canceledOwner = event.params.canceledOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnerPending(event: OwnerPendingEvent): void {
//   let entity = new OwnerPending(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.pendingOwner = event.params.pendingOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {
//   let entity = new OwnerUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.prevOwner = event.params.prevOwner
//   entity.newOwner = event.params.newOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUpgradeRegistered(event: UpgradeRegisteredEvent): void {
//   let entity = new UpgradeRegistered(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.baseImpl = event.params.baseImpl
//   entity.upgradeImpl = event.params.upgradeImpl

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUpgradeRemoved(event: UpgradeRemovedEvent): void {
//   let entity = new UpgradeRemoved(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.baseImpl = event.params.baseImpl
//   entity.upgradeImpl = event.params.upgradeImpl

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUpgraded(event: UpgradedEvent): void {
//   let entity = new Upgraded(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.impl = event.params.impl

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
