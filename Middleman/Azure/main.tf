provider "azurerm" {
  features {}
}

# Resource Group for Backend and Database
resource "azurerm_resource_group" "backend" {
  name     = "backend-rg"
  location = "eastus"
}

# Resource Group for Frontend
resource "azurerm_resource_group" "frontend" {
  name     = "frontend-rg"
  location = "eastus"
}

# MongoDB Database
resource "azurerm_cosmosdb_account" "mongo" {
  name                = "middleman-mongo"
  location            = azurerm_resource_group.backend.location
  resource_group_name = azurerm_resource_group.backend.name
  offer_type          = "Standard"
  kind                = "MongoDB"

  capabilities {
    name = "EnableMongo"
  }

  consistency_policy {
    consistency_level = "BoundedStaleness"
  }

  geo_location {
    location          = azurerm_resource_group.backend.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_mongo_database" "middleman_db" {
  name                = "middleman"
  resource_group_name = azurerm_resource_group.backend.name
  account_name        = azurerm_cosmosdb_account.mongo.name
}

# Backend Container Group
resource "azurerm_container_group" "backend" {
  name                = "middleman-backend"
  location            = azurerm_resource_group.backend.location
  resource_group_name = azurerm_resource_group.backend.name
  os_type             = "Linux"
  ip_address_type     = "Public"
  dns_name_label      = "middleman-backend"
  restart_policy      = "OnFailure"

  container {
    name   = "middleman-backend"
    image  = "przemek899/middleman-backend"
    cpu    = "1"
    memory = "2.0"
    ports {
      port     = 5000
      protocol = "TCP"
    }

    environment_variables = {
      MONGO_URI = azurerm_cosmosdb_account.mongo.connection_strings[0]
    }
  }

  tags = {
    environment = "testing"
  }
}

# Frontend Container Group
resource "azurerm_container_group" "frontend" {
  name                = "middleman-frontend"
  location            = azurerm_resource_group.frontend.location
  resource_group_name = azurerm_resource_group.frontend.name
  os_type             = "Linux"
  ip_address_type     = "Public"
  dns_name_label      = "middleman-frontend"
  restart_policy      = "OnFailure"

  container {
    name   = "middleman-frontend"
    image  = "przemek899/middleman-frontend"
    cpu    = "2"
    memory = "4.0"
    ports {
      port     = 3000
      protocol = "TCP"
    }

    environment_variables = {
      REACT_APP_SERVER_IP = azurerm_container_group.backend.ip_address
    }
  }

  tags = {
    environment = "testing"
  }

  depends_on = [
    azurerm_container_group.backend
  ]
}

# Network Security Group for Backend
resource "azurerm_network_security_group" "backend_nsg" {
  name                = "backend-nsg"
  location            = azurerm_resource_group.backend.location
  resource_group_name = azurerm_resource_group.backend.name
}

# Network Security Group for Frontend
resource "azurerm_network_security_group" "frontend_nsg" {
  name                = "frontend-nsg"
  location            = azurerm_resource_group.frontend.location
  resource_group_name = azurerm_resource_group.frontend.name
}

# NSG Rules for Backend
resource "azurerm_network_security_rule" "backend_ssh" {
  name                        = "backend-nsg-rule-ssh"
  priority                    = 1000
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.backend.name
  network_security_group_name = azurerm_network_security_group.backend_nsg.name
}

resource "azurerm_network_security_rule" "backend_outbound" {
  name                        = "backend-nsg-rule-outbound"
  priority                    = 1000
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.backend.name
  network_security_group_name = azurerm_network_security_group.backend_nsg.name
}

resource "azurerm_network_security_rule" "backend_5000" {
  name                        = "backend-nsg-rule-5000"
  priority                    = 1001
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "5000"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.backend.name
  network_security_group_name = azurerm_network_security_group.backend_nsg.name
}

# NSG Rules for Frontend
resource "azurerm_network_security_rule" "frontend_ssh" {
  name                        = "frontend-nsg-rule-ssh"
  priority                    = 1000
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.frontend.name
  network_security_group_name = azurerm_network_security_group.frontend_nsg.name
}

resource "azurerm_network_security_rule" "frontend_outbound" {
  name                        = "frontend-nsg-rule-outbound"
  priority                    = 1000
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.frontend.name
  network_security_group_name = azurerm_network_security_group.frontend_nsg.name
}

resource "azurerm_network_security_rule" "frontend_3000" {
  name                        = "frontend-nsg-rule-3000"
  priority                    = 1002
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3000"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.frontend.name
  network_security_group_name = azurerm_network_security_group.frontend_nsg.name
}

# Output the IP address of the backend and frontend container groups
output "backend_public_ip" {
  value = azurerm_container_group.backend.ip_address
}

output "frontend_public_ip" {
  value = azurerm_container_group.frontend.ip_address
}