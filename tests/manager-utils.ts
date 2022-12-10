import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { ManagerUpgraded } from "../generated/Manager/Manager"

export function createManagerUpgradedEvent(impl: Address): ManagerUpgraded {
  let managerUpgradedEvent = changetype<ManagerUpgraded>(newMockEvent())

  managerUpgradedEvent.parameters = new Array()

  managerUpgradedEvent.parameters.push(
    new ethereum.EventParam("impl", ethereum.Value.fromAddress(impl))
  )

  return managerUpgradedEvent
}
