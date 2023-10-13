resource "azurerm_virtual_network" "terraform" {
  name                = "terraform"
  location            = azurerm_resource_group.terraform.location
  resource_group_name = azurerm_resource_group.terraform.name
  address_space       = ["10.0.0.0/24"]

  subnet {
    name           = "default"
    address_prefix = "10.0.0.0/24"
  }
}