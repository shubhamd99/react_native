cmake_minimum_required(VERSION 3.10)

project(NitroModulesDemo)

# Create the shared library
add_library(
        NitroModulesDemo
        SHARED
        # We add a dummy file because target_sources needs at least one file to start with
        # Nitrogen will add the rest of the files via the included cmake file
        ""
)

# Include the Nitrogen generated autolinking file
# Note: The path is relative to THIS file (src/main/jni)
include(${CMAKE_CURRENT_SOURCE_DIR}/../../../../../nitrogen/generated/android/NitroModulesDemo+autolinking.cmake)

# Support 16KB page sizes (Android 15+ compatibility)
# We are using NDK r27+, which supports 16KB aligned prebuilts.
# We explicitly set alignment for our own shared library.
target_link_options(
        NitroModulesDemo
        PRIVATE
        "-Wl,-z,common-page-size=16384"
        "-Wl,-z,max-page-size=16384"
)

# Explicitly link the C++ standard library to resolve undefined symbol errors with NDK r27.
target_link_libraries(
        NitroModulesDemo
        c++
)
