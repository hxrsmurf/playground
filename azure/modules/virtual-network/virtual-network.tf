resource "azurerm_virtual_network" "terraform" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource-group-name
  address_space       = [var.address_space]

  subnet {
    name           = "default"
    address_prefix = var.address_space
  }
}