package com.freelanceos

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.freelanceos.navigation.NavGraph
import com.freelanceos.ui.theme.FreelanceOSTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FreelanceOSTheme {
                NavGraph()
            }
        }
    }
}
