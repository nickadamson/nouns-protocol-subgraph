import { Address, BigInt } from "@graphprotocol/graph-ts";
import { DAODeployed as DAODeployedEvent } from "../generated/ManagerImpl/ManagerImpl";

import { Token as TokenContractInstance } from "../generated/templates/TokenContract/Token";
import { Auction as AuctionContractInstance } from "../generated/templates/AuctionContract/Auction";
import { MetadataRenderer as MetadataContractInstance } from "../generated/templates/MetadataContract/MetadataRenderer";
import { Governor as GovernorContractInstance } from "../generated/templates/GovernorContract/Governor";
import { Treasury as TreasuryContractInstance } from "../generated/templates/TreasuryContract/Treasury";

import {
  DAO,
  AuctionContract,
  GovernorContract,
  MetadataContract,
  TokenContract,
  TreasuryContract,
} from "../generated/schema";
import {
  AuctionContract as AuctionContractEntity,
  GovernorContract as GovernorContractEntity,
  MetadataContract as MetadataContractEntity,
  TokenContract as TokenContractEntity,
  TreasuryContract as TreasuryContractEntity,
} from "../generated/templates";

import { ZERO_ADDRESS } from "../utils/constants";

export function handleNewDAO(event: DAODeployedEvent): void {
  // format addresses
  let tokenAddr = event.params.token.toHexString();
  const auctionAddr = event.params.auction.toHexString();
  const metadataAddr = event.params.metadata.toHexString();
  const governorAddr = event.params.governor.toHexString();
  const treasuryAddr = event.params.treasury.toHexString();

  // init DAO entity & save
  let newDAO = new DAO(tokenAddr);
  newDAO.creationTxHash = event.transaction.hash;
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

  TokenContractEntity.create(Address.fromString(tokenAddr));
  let newTokenContract = new TokenContract(tokenAddr);
  newTokenContract.DAO = newDAO.id;
  newTokenContract.name = tokenDeployment.name();
  newTokenContract.symbol = tokenDeployment.symbol();
  newTokenContract.contractURI = tokenDeployment.contractURI();
  newTokenContract.totalSupply = tokenDeployment.totalSupply();
  newTokenContract.owner = tokenDeployment.owner().toHexString();
  newTokenContract.auctionContract = auctionAddr;
  newTokenContract.save();
  // const founders = tokenDeployment.getFounders();
  // handleFounders(founders, newTokenContract); // TODO okay in mintScheduled?

  AuctionContractEntity.create(Address.fromString(auctionAddr));
  let newAuctionContract = new AuctionContract(auctionAddr);
  newAuctionContract.DAO = newDAO.id;
  newAuctionContract.duration = auctionDeployment.duration();
  newAuctionContract.reservePrice = auctionDeployment.reservePrice();
  newAuctionContract.timeBuffer = auctionDeployment.timeBuffer();
  newAuctionContract.minBidIncrement = auctionDeployment.minBidIncrement();
  newAuctionContract.paused = auctionDeployment.paused();
  newAuctionContract.owner = auctionDeployment.owner().toHexString();
  newAuctionContract.tokenContract = tokenAddr;
  newAuctionContract.save();

  MetadataContractEntity.create(Address.fromString(metadataAddr));
  let newMetadataContract = new MetadataContract(metadataAddr);
  newMetadataContract.DAO = newDAO.id;
  newMetadataContract.websiteURL = metadataDeployment.projectURI();
  newMetadataContract.description = metadataDeployment.description();
  newMetadataContract.contractImage = metadataDeployment.contractImage();
  newMetadataContract.rendererBase = metadataDeployment.rendererBase();
  newMetadataContract.save();

  GovernorContractEntity.create(Address.fromString(governorAddr));
  let newGovernorContract = new GovernorContract(governorAddr);
  newGovernorContract.DAO = newDAO.id;
  const vetoer = governorDeployment.vetoer();
  newGovernorContract.nextProposalNumber = BigInt.fromI32(1);
  newGovernorContract.vetoerAddress = vetoer;
  newGovernorContract.vetoEnabled = vetoer !== ZERO_ADDRESS;
  newGovernorContract.proposalThreshold = governorDeployment.proposalThresholdBps();
  newGovernorContract.quoromThreshold = governorDeployment.quorumThresholdBps();
  newGovernorContract.votingDelay = governorDeployment.votingDelay();
  newGovernorContract.votingPeriod = governorDeployment.votingPeriod();
  newGovernorContract.owner = governorDeployment.owner().toHexString();
  newGovernorContract.tokenContract = newTokenContract.id;
  newGovernorContract.save();

  TreasuryContractEntity.create(Address.fromString(treasuryAddr));
  let newTreasuryContract = new TreasuryContract(treasuryAddr);
  newTreasuryContract.DAO = newDAO.id;
  newTreasuryContract.delay = treasuryDeployment.delay();
  newTreasuryContract.gracePeriod = treasuryDeployment.gracePeriod();
  newTreasuryContract.owner = treasuryDeployment.owner().toHexString();
  newTreasuryContract.save();
}
