package com.freelanceos.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import com.freelanceos.navigation.Screen

@Composable
fun BottomNavBar(
    currentRoute: String?,
    onNavigate: (String) -> Unit
) {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        contentColor = MaterialTheme.colorScheme.onSurface
    ) {
        NavigationBarItem(
            selected = currentRoute == Screen.Dashboard.route,
            onClick = { onNavigate(Screen.Dashboard.route) },
            icon = { Icon(Icons.Default.Home, contentDescription = "Dashboard") },
            label = { Text(Screen.Dashboard.title) },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant,
                indicatorColor = MaterialTheme.colorScheme.surfaceVariant
            )
        )
    }
}
