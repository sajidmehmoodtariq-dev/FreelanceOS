package com.freelanceos.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.unit.dp
import com.freelanceos.ui.theme.ErrorRed
import com.freelanceos.ui.theme.SuccessGreen

@Composable
fun StatusIndicator(isConnected: Boolean) {
    if (isConnected) {
        val infiniteTransition = rememberInfiniteTransition(label = "pulse")
        val scale by infiniteTransition.animateFloat(
            initialValue = 1f,
            targetValue = 1.3f,
            animationSpec = infiniteRepeatable(
                animation = tween(1000),
                repeatMode = RepeatMode.Reverse
            ),
            label = "pulse_scale"
        )
        Box(
            modifier = Modifier
                .size(12.dp)
                .scale(scale)
                .clip(CircleShape)
                .background(SuccessGreen)
        )
    } else {
        Box(
            modifier = Modifier
                .size(12.dp)
                .clip(CircleShape)
                .background(ErrorRed)
        )
    }
}
