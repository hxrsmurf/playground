resource "azurerm_resource_group" "terraform" {
  name     = var.name
  location = "East Us"
}