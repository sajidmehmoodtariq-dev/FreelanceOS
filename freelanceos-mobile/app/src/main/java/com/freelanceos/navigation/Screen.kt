package com.freelanceos.navigation

sealed class Screen(val route: String, val title: String) {
    object Dashboard : Screen("dashboard", "Dashboard")
}
