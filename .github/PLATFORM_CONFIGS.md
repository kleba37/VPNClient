# 📱 Platform Configurations for Hysteria2 VPN Client

Этот документ содержит конфигурации для сборки приложения на различных платформах.

## 🤖 Android Configuration

### `android/app/build.gradle`
```gradle
android {
    compileSdkVersion 33
    buildToolsVersion "33.0.0"
    
    defaultConfig {
        applicationId "com.vpnclient.hysteria2"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
        
        ndk {
            abiFilters "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }
    
    signingConfigs {
        release {
            if (project.hasProperty('storeFile')) {
                storeFile file(storeFile)
                storePassword storePassword
                keyAlias keyAlias
                keyPassword keyPassword
            }
        }
    }
    
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
    
    bundle {
        language {
            enableSplit = false
        }
        density {
            enableSplit = false
        }
        abi {
            enableSplit = true
        }
    }
}
```

### `android/app/proguard-rules.pro`
```proguard
# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# VPN specific
-keep class com.vpnclient.hysteria2.** { *; }
-keep class * implements android.net.VpnService { *; }

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}
```

## 🍎 iOS Configuration

### `ios/Hysteria2VpnClient.xcodeproj/project.pbxproj`
```pbxproj
// Основные настройки
IPHONEOS_DEPLOYMENT_TARGET = 12.0;
SWIFT_VERSION = 5.0;
CLANG_ENABLE_MODULES = YES;

// Capabilities
CODE_SIGN_ENTITLEMENTS = Hysteria2VpnClient/Hysteria2VpnClient.entitlements;
CODE_SIGN_STYLE = Automatic;
DEVELOPMENT_TEAM = YOUR_TEAM_ID;

// Build settings
ENABLE_BITCODE = NO;
VALIDATE_WORKSPACE = YES;
```

### `ios/Hysteria2VpnClient/Hysteria2VpnClient.entitlements`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.developer.networking.vpn.api</key>
    <array>
        <string>allow-vpn</string>
    </array>
    <key>com.apple.developer.networking.networkextension</key>
    <array>
        <string>packet-tunnel-provider</string>
        <string>app-proxy-provider</string>
        <string>content-filter-provider</string>
    </array>
</dict>
</plist>
```

### `ios/Podfile`
```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '12.0'
install! 'cocoapods', :deterministic_uuids => false

target 'Hysteria2VpnClient' do
  config = use_native_modules!
  
  use_frameworks! :linkage => :static
  
  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true,
    :fabric_enabled => false,
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
  
  target 'Hysteria2VpnClientTests' do
    inherit! :complete
    # Pods for testing
  end
  
  post_install do |installer|
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false
    )
    
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
      end
    end
  end
end
```

## 🪟 Windows Configuration

### `windows/Hysteria2VpnClient.sln`
```xml
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.0.31903.59
MinimumVisualStudioVersion = 10.0.40219.1
Project("{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}") = "Hysteria2VpnClient", "Hysteria2VpnClient.vcxproj", "{A990658C-CE31-4BCC-814F-61E9F596C853}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|x64 = Debug|x64
		Release|x64 = Release|x64
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{A990658C-CE31-4BCC-814F-61E9F596C853}.Debug|x64.ActiveCfg = Debug|x64
		{A990658C-CE31-4BCC-814F-61E9F596C853}.Debug|x64.Build.0 = Debug|x64
		{A990658C-CE31-4BCC-814F-61E9F596C853}.Release|x64.ActiveCfg = Release|x64
		{A990658C-CE31-4BCC-814F-61E9F596C853}.Release|x64.Build.0 = Release|x64
	EndGlobalSection
EndGlobal
```

### `windows/Hysteria2VpnClient/Hysteria2VpnClient.vcxproj`
```xml
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup Label="Globals">
    <VCProjectVersion>16.0</VCProjectVersion>
    <ProjectGuid>{A990658C-CE31-4BCC-814F-61E9F596C853}</ProjectGuid>
    <RootNamespace>Hysteria2VpnClient</RootNamespace>
    <WindowsTargetPlatformVersion>10.0</WindowsTargetPlatformVersion>
  </PropertyGroup>
  
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="Configuration">
    <ConfigurationType>Application</ConfigurationType>
    <UseDebugLibraries>false</UseDebugLibraries>
    <PlatformToolset>v143</PlatformToolset>
    <WholeProgramOptimization>true</WholeProgramOptimization>
  </PropertyGroup>
  
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <ClCompile>
      <WarningLevel>Level3</WarningLevel>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>NDEBUG;_WINDOWS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>NotUsing</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
      <OptimizeReferences>true</OptimizeReferences>
      <GenerateDebugInformation>true</GenerateDebugInformation>
    </Link>
  </ItemDefinitionGroup>
</Project>
```

## 🐧 Linux Configuration

### `linux/CMakeLists.txt`
```cmake
cmake_minimum_required(VERSION 3.16)

project(Hysteria2VpnClient VERSION 1.0.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(PkgConfig REQUIRED)
find_package(GTK3 REQUIRED)
find_package(WebKit2 REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(CURL REQUIRED)

# Include directories
include_directories(${CMAKE_SOURCE_DIR}/src)
include_directories(${GTK3_INCLUDE_DIRS})
include_directories(${WEBKIT2_INCLUDE_DIRS})
include_directories(${OPENSSL_INCLUDE_DIR})
include_directories(${CURL_INCLUDE_DIRS})

# Source files
set(SOURCES
    src/main.cpp
    src/App.cpp
    src/VpnManager.cpp
    src/NetworkManager.cpp
)

# Create executable
add_executable(${PROJECT_NAME} ${SOURCES})

# Link libraries
target_link_libraries(${PROJECT_NAME}
    ${GTK3_LIBRARIES}
    ${WEBKIT2_LIBRARIES}
    ${OPENSSL_LIBRARIES}
    ${CURL_LIBRARIES}
    pthread
    dl
    ssl
    crypto
)

# Compiler flags
target_compile_options(${PROJECT_NAME} PRIVATE
    ${GTK3_CFLAGS_OTHER}
    -Wall
    -Wextra
    -std=c++17
    -O2
    -DNDEBUG
)

# Install target
install(TARGETS ${PROJECT_NAME}
    RUNTIME DESTINATION bin
)

# Install desktop file
install(FILES ${PROJECT_NAME}.desktop
    DESTINATION share/applications
)

# Install icon
install(FILES icons/${PROJECT_NAME}.png
    DESTINATION share/pixmaps
)
```

### `linux/Hysteria2VpnClient.desktop`
```desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=Hysteria2 VPN Client
Comment=Cross-platform VPN client with Hysteria2 protocol support
Exec=Hysteria2VpnClient
Icon=Hysteria2VpnClient
Terminal=false
Categories=Network;VPN;
Keywords=VPN;Hysteria2;Security;Privacy;
```

## 🍎 macOS Configuration

### `macos/Hysteria2VpnClient.xcodeproj/project.pbxproj`
```pbxproj
// Основные настройки
MACOSX_DEPLOYMENT_TARGET = 10.15;
SWIFT_VERSION = 5.0;
CLANG_ENABLE_MODULES = YES;

// Capabilities
CODE_SIGN_ENTITLEMENTS = Hysteria2VpnClient/Hysteria2VpnClient.entitlements;
CODE_SIGN_STYLE = Automatic;
DEVELOPMENT_TEAM = YOUR_TEAM_ID;

// Build settings
ENABLE_BITCODE = NO;
VALIDATE_WORKSPACE = YES;
SUPPORTED_PLATFORMS = macosx;
```

### `macos/Hysteria2VpnClient/Hysteria2VpnClient.entitlements`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.network.server</key>
    <true/>
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
</dict>
</plist>
```

## 🌐 Web Configuration

### `web/package.json`
```json
{
  "name": "hysteria2-vpn-client-web",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-router-dom": "^6.8.0",
    "styled-components": "^5.3.6"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### `web/public/manifest.json`
```json
{
  "short_name": "Hysteria2 VPN",
  "name": "Hysteria2 VPN Client",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## 🐳 Docker Configuration

### `Dockerfile.multiarch`
```dockerfile
# Multi-stage build for React Native app
FROM --platform=$BUILDPLATFORM node:18-alpine AS base

# Install dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    jq

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build stage for different platforms
FROM base AS android-build
RUN npm run build:android

FROM base AS ios-build
RUN npm run build:ios

FROM base AS windows-build
RUN npm run build:windows

FROM base AS linux-build
RUN npm run build:linux

FROM base AS macos-build
RUN npm run build:macos

FROM base AS web-build
RUN npm run build:web

# Production stage
FROM node:18-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    curl

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=web-build --chown=nextjs:nodejs /app/build ./build
COPY --from=web-build --chown=nextjs:nodejs /app/public ./public
COPY --from=web-build --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
```

### `docker-compose.multiarch.yml`
```yaml
version: '3.8'

services:
  hysteria2-vpn-client:
    build:
      context: .
      dockerfile: Dockerfile.multiarch
      target: production
      platforms:
        - linux/amd64
        - linux/arm64
        - linux/arm/v7
    container_name: hysteria2-vpn-client
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
    networks:
      - vpn-network
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7-alpine
    container_name: vpn-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - vpn-network
    command: redis-server --appendonly yes

  postgres:
    image: postgres:15-alpine
    container_name: vpn-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=vpn_client
      - POSTGRES_USER=vpn_user
      - POSTGRES_PASSWORD=vpn_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - vpn-network

volumes:
  redis-data:
    driver: local
  postgres-data:
    driver: local

networks:
  vpn-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## 🔧 Build Scripts

### `scripts/build-all.sh`
```bash
#!/bin/bash

set -e

echo "🚀 Building Hysteria2 VPN Client for all platforms..."

# Clean all builds
echo "🧹 Cleaning previous builds..."
npm run clean:all

# Build Android
echo "🤖 Building Android..."
npm run build:android

# Build iOS
echo "🍎 Building iOS..."
npm run build:ios

# Build Windows
echo "🪟 Building Windows..."
npm run build:windows

# Build Linux
echo "🐧 Building Linux..."
npm run build:linux

# Build macOS
echo "🍎 Building macOS..."
npm run build:macos

# Build Web
echo "🌐 Building Web..."
npm run build:web

echo "✅ All builds completed successfully!"
echo ""
echo "📱 Build artifacts:"
echo "  - Android: android/app/build/outputs/"
echo "  - iOS: ios/build/"
echo "  - Windows: windows/build/"
echo "  - Linux: linux/build/"
echo "  - macOS: macos/build/"
echo "  - Web: build/"
```

### `scripts/deploy.sh`
```bash
#!/bin/bash

set -e

PLATFORM=$1
VERSION=$2

if [ -z "$PLATFORM" ] || [ -z "$VERSION" ]; then
    echo "Usage: $0 <platform> <version>"
    echo "Platforms: android, ios, windows, linux, macos, web, all"
    echo "Example: $0 android 1.0.0"
    exit 1
fi

echo "🚀 Deploying Hysteria2 VPN Client v$VERSION to $PLATFORM..."

case $PLATFORM in
    "android")
        echo "🤖 Deploying Android..."
        # Upload to Google Play Console
        # Upload to Firebase App Distribution
        ;;
    "ios")
        echo "🍎 Deploying iOS..."
        # Upload to App Store Connect
        # Upload to TestFlight
        ;;
    "windows")
        echo "🪟 Deploying Windows..."
        # Upload to Microsoft Store
        # Upload to GitHub Releases
        ;;
    "linux")
        echo "🐧 Deploying Linux..."
        # Upload to Snap Store
        # Upload to Flatpak
        # Upload to GitHub Releases
        ;;
    "macos")
        echo "🍎 Deploying macOS..."
        # Upload to Mac App Store
        # Upload to GitHub Releases
        ;;
    "web")
        echo "🌐 Deploying Web..."
        # Deploy to CDN
        # Deploy to Vercel/Netlify
        ;;
    "all")
        echo "🌍 Deploying to all platforms..."
        $0 android $VERSION
        $0 ios $VERSION
        $0 windows $VERSION
        $0 linux $VERSION
        $0 macos $VERSION
        $0 web $VERSION
        ;;
    *)
        echo "❌ Unknown platform: $PLATFORM"
        exit 1
        ;;
esac

echo "✅ Deployment to $PLATFORM completed!"
```

## 📊 Platform Matrix

| Platform | Build Tool | Output | Package Manager | Store |
|----------|------------|---------|-----------------|-------|
| Android | Gradle | APK/AAB | Google Play | ✅ |
| iOS | Xcode | IPA | App Store | ✅ |
| Windows | MSBuild | EXE/MSI | Microsoft Store | ✅ |
| Linux | CMake | Binary | Snap/Flatpak | ✅ |
| macOS | Xcode | APP | Mac App Store | ✅ |
| Web | Webpack | PWA | CDN | ✅ |
| Docker | Docker | Image | Docker Hub | ✅ |

## 🔒 Security Considerations

### Code Signing
- **Android**: Keystore-based signing
- **iOS**: Apple Developer certificates
- **Windows**: Microsoft Authenticode
- **macOS**: Apple Developer certificates
- **Linux**: GPG signing (optional)

### Network Security
- **VPN Permissions**: Proper entitlements
- **Network Extensions**: iOS/macOS specific
- **Firewall Rules**: Platform-specific configurations

### Data Protection
- **Encryption**: At-rest and in-transit
- **Key Management**: Secure key storage
- **Privacy**: GDPR compliance

---

**Примечание**: Эти конфигурации обеспечивают сборку приложения на всех поддерживаемых платформах. Убедитесь, что все зависимости и инструменты установлены корректно.
