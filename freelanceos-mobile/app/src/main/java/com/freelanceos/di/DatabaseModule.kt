package com.freelanceos.di

import android.content.Context
import androidx.room.Room
import com.freelanceos.data.local.db.FreelanceOsDatabase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): FreelanceOsDatabase {
        return Room.databaseBuilder(
            context,
            FreelanceOsDatabase::class.java,
            "freelanceos_db"
        ).build()
    }
}
