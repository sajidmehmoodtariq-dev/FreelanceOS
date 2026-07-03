package com.freelanceos.ui.screens.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.freelanceos.data.repository.HealthRepository
import com.freelanceos.data.repository.Result
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class HealthState(
    val isConnected: Boolean = false,
    val databaseStatus: String = "Unknown",
    val isLoading: Boolean = true,
    val serverTime: String = ""
)

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val healthRepository: HealthRepository
) : ViewModel() {

    private val _state = MutableStateFlow(HealthState())
    val state: StateFlow<HealthState> = _state.asStateFlow()

    init {
        startHealthCheck()
    }

    private fun startHealthCheck() {
        viewModelScope.launch {
            while (true) {
                when (val result = healthRepository.checkHealth()) {
                    is Result.Success -> {
                        _state.value = _state.value.copy(
                            isConnected = result.data.success,
                            databaseStatus = result.data.data?.database ?: "Unknown",
                            serverTime = result.data.data?.timestamp ?: "",
                            isLoading = false
                        )
                    }
                    is Result.Error -> {
                        _state.value = _state.value.copy(
                            isConnected = false,
                            databaseStatus = "Error",
                            isLoading = false
                        )
                    }
                    Result.Loading -> { }
                }
                delay(10000)
            }
        }
    }
}
