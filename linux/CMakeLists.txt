cmake_minimum_required(VERSION 3.16)
project(Hysteria2VpnClient)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(Hysteria2VpnClient main.cpp)

# Set output directory
set_target_properties(Hysteria2VpnClient PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Install target
install(TARGETS Hysteria2VpnClient
    RUNTIME DESTINATION bin
)
