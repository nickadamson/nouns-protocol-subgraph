import {
  DAODeployed as DAODeployedEvent,
  Initialized as InitializedEvent,
  OwnerCanceled as OwnerCanceledEvent,
  OwnerPending as OwnerPendingEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  UpgradeRegistered as UpgradeRegisteredEvent,
  UpgradeRemoved as UpgradeRemovedEvent,
  Upgraded as UpgradedEvent
} from "../generated/ManagerImpl/ManagerImpl"
import {
  DAODeployed,
  Initialized,
  OwnerCanceled,
  OwnerPending,
  OwnerUpdated,
  UpgradeRegistered,
  UpgradeRemoved,
  Upgraded
} from "../generated/schema"

export function handleDAODeployed(event: DAODeployedEvent): void {
  let entity = new DAODeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.metadata = event.params.metadata
  entity.auction = event.params.auction
  entity.treasury = event.params.treasury
  entity.governor = event.params.governor

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerCanceled(event: OwnerCanceledEvent): void {
  let entity = new OwnerCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.canceledOwner = event.params.canceledOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerPending(event: OwnerPendingEvent): void {
  let entity = new OwnerPending(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.pendingOwner = event.params.pendingOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {
  let entity = new OwnerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevOwner = event.params.prevOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgradeRegistered(event: UpgradeRegisteredEvent): void {
  let entity = new UpgradeRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.baseImpl = event.params.baseImpl
  entity.upgradeImpl = event.params.upgradeImpl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgradeRemoved(event: UpgradeRemovedEvent): void {
  let entity = new UpgradeRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.baseImpl = event.params.baseImpl
  entity.upgradeImpl = event.params.upgradeImpl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.impl = event.params.impl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
