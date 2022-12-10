import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DAODeployed,
  Initialized,
  OwnerCanceled,
  OwnerPending,
  OwnerUpdated,
  UpgradeRegistered,
  UpgradeRemoved,
  Upgraded
} from "../generated/ManagerImpl/ManagerImpl"

export function createDAODeployedEvent(
  token: Address,
  metadata: Address,
  auction: Address,
  treasury: Address,
  governor: Address
): DAODeployed {
  let daoDeployedEvent = changetype<DAODeployed>(newMockEvent())

  daoDeployedEvent.parameters = new Array()

  daoDeployedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  daoDeployedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromAddress(metadata))
  )
  daoDeployedEvent.parameters.push(
    new ethereum.EventParam("auction", ethereum.Value.fromAddress(auction))
  )
  daoDeployedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  daoDeployedEvent.parameters.push(
    new ethereum.EventParam("governor", ethereum.Value.fromAddress(governor))
  )

  return daoDeployedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createOwnerCanceledEvent(
  owner: Address,
  canceledOwner: Address
): OwnerCanceled {
  let ownerCanceledEvent = changetype<OwnerCanceled>(newMockEvent())

  ownerCanceledEvent.parameters = new Array()

  ownerCanceledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ownerCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "canceledOwner",
      ethereum.Value.fromAddress(canceledOwner)
    )
  )

  return ownerCanceledEvent
}

export function createOwnerPendingEvent(
  owner: Address,
  pendingOwner: Address
): OwnerPending {
  let ownerPendingEvent = changetype<OwnerPending>(newMockEvent())

  ownerPendingEvent.parameters = new Array()

  ownerPendingEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ownerPendingEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return ownerPendingEvent
}

export function createOwnerUpdatedEvent(
  prevOwner: Address,
  newOwner: Address
): OwnerUpdated {
  let ownerUpdatedEvent = changetype<OwnerUpdated>(newMockEvent())

  ownerUpdatedEvent.parameters = new Array()

  ownerUpdatedEvent.parameters.push(
    new ethereum.EventParam("prevOwner", ethereum.Value.fromAddress(prevOwner))
  )
  ownerUpdatedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerUpdatedEvent
}

export function createUpgradeRegisteredEvent(
  baseImpl: Address,
  upgradeImpl: Address
): UpgradeRegistered {
  let upgradeRegisteredEvent = changetype<UpgradeRegistered>(newMockEvent())

  upgradeRegisteredEvent.parameters = new Array()

  upgradeRegisteredEvent.parameters.push(
    new ethereum.EventParam("baseImpl", ethereum.Value.fromAddress(baseImpl))
  )
  upgradeRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "upgradeImpl",
      ethereum.Value.fromAddress(upgradeImpl)
    )
  )

  return upgradeRegisteredEvent
}

export function createUpgradeRemovedEvent(
  baseImpl: Address,
  upgradeImpl: Address
): UpgradeRemoved {
  let upgradeRemovedEvent = changetype<UpgradeRemoved>(newMockEvent())

  upgradeRemovedEvent.parameters = new Array()

  upgradeRemovedEvent.parameters.push(
    new ethereum.EventParam("baseImpl", ethereum.Value.fromAddress(baseImpl))
  )
  upgradeRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "upgradeImpl",
      ethereum.Value.fromAddress(upgradeImpl)
    )
  )

  return upgradeRemovedEvent
}

export function createUpgradedEvent(impl: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam("impl", ethereum.Value.fromAddress(impl))
  )

  return upgradedEvent
}
