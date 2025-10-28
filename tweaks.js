const TWEAKS_DATA = [
    {
        "id": "disable-transparency-effects",
        "title": "Disable Transparency Effects",
        "description": "Disable transparency effects in windows. This generally does not matter ",
        "warning": null,
        "code_apply": "Set-ItemProperty -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize\" -Name EnableTransparency -Value 0",
        "tags": [
            "performance"
        ],
        "performance_level": 1
    },
    {
        "id": "disable-mpo",
        "title": "Disable MPO",
        "description": "Multi-Plane Overlay fixes flickering issues NVIDIA RTX 40/30/20 series and AMD RX 5000/6000/7000",
        "warning": null,
        "code_apply": "Set-ItemProperty -Path \"HKLM:\\SOFTWARE\\Microsoft\\Windows\\Dwm\" -Name \"OverlayTestMode\" -Value 5 -Type DWORD",
        "tags": [
            "fix"
        ],
        "performance_level": 1
    },
    {
        "id": "disable-memory-compression",
        "title": "Disable Memory Compression",
        "description": "If you have 16GB or more ram you can pick this. It can save some CPU cycles",
        "warning": "+16GB RAM",
        "code_apply": `Disable-MMAgent -MemoryCompression
Disable-MMAgent -PageCombining`,
        "tags": [
            "performance"
        ],
        "performance_level": 1
    },
    {
        "id": "large-system-cache",
        "title": "Large System Cache",
        "description": "Large System Cache can help with application that use large amout of memory (video editors, large games) It was the most useful in the XP-era unsure if its still useful ",
        "warning": null,
        "code_apply": "Set-ItemProperty -Path \"HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\" -Name \"LargeSystemCache\" -Type DWord -Force -Value 1",
        "tags": [
            "performance"
        ],
        "performance_level": 1
    },
    {
        "id": "disable-dvr",
        "title": "Disable DVR",
        "description": "Disable DVR (Auto Record clips with the xbox apps) If it was enabled disabling can provide big improvement ",
        "warning": null,
        "code_apply": `Set-ItemProperty -Path "HKCU:\\System\\GameConfigStore" -Name "GameDVR_Enabled" -Value 0 -Type DWORD
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" -Name "AllowGameDVR" -Value 0 -Type DWORD -Force`,
        "tags": [
            "performance"
        ],
        "performance_level": 2
    },
    {
        "id": "disable-write-combining",
        "title": "Disable Write Combining",
        "description": "This tweak is very popular but outdated. It used to help with input lantancy on older nvidia drvier (451.48) but reduce your fps. Avoid this one unless you are on a very old GPU",
        "warning": "Read the description",
        "code_apply": "Reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm\" /v \"DisableWriteCombining\" /t REG_DWORD /d \"1\" /f",
        "tags": [
            "advanced"
        ],
        "performance_level": null
    },
    {
        "id": "disable-hdcp",
        "title": "Disable HDCP",
        "description": "Disabling High-bandwidth Digital Content Protection can help with network latency",
        "warning": null,
        "code_apply": "reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\" /v \"RMHdcpKeyGlobZero\" /t REG_DWORD /d \"1\"",
        "tags": [
            "network"
        ],
        "performance_level": null
    },
    {
        "id": "disable-display-power-saving",
        "title": "Disable Display Power Saving",
        "description": "In some case it seems to help a lot with performance and bugs",
        "warning": "Nvidia only",
        "code_apply": `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Servicesvlddmkm\\Global\\NVTweak" /v "DisplayPowerSaving" /t REG_DWORD /d "0" /f
`,
        "source_url": "https://www.reddit.com/r/buildapc/comments/o7i8an/nvidia_inspectors_multidisplay_power_saver/",
        "tags": [
            "performance",
            "fix"
        ],
        "performance_level": 2
    },
    {
        "id": "disable-nvidia-telemetry",
        "title": "Disable NVidia Telemetry",
        "description": "Disable NVidia Telemetry container even after updates",
        "warning": "Already done if NVCleanInstall",
        "code_apply": `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\NvTelemetryContainer.exe" /v Debugger /t REG_SZ /d "%windir%\\System32\\taskkill.exe" /f
reg add "HKLM\\SOFTWARE\\NVIDIA Corporation\\NvControlPanel2\\Client" /v "OptInOrOutPreference" /t REG_DWORD /d "0" /f`,
        "source_url": "https://fdossena.com/?p=nvtelemetry/i.md",
        "tags": [
            "privacy"
        ],
        "performance_level": null
    },
    {
        "id": "fast-datagram",
        "title": "Fast datagram",
        "description": "Enable fast datagram when sending UDP traffic. Can reduce latancy",
        "warning": null,
        "code_apply": "reg add \"HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters\" /v \"FastSendDatagramThreshold\" /t REG_DWORD /d 64000 /f",
        "source_url": null,
        "tags": [
            "network"
        ],
        "performance_level": null
    },
    {
        "id": "win32priorityseparation",
        "title": "Win32PrioritySeparation Optimization",
        "description": "This tweak has a LOT of information about it (Check the ! icon). This tweak will set the value of Win32PrioritySeparation to 36 (0x24) This value seems to give the best latency and FPS but 20, 41 can also provide similar boost or better on some PCs.",
        "warning": null,
        "code_apply": "Set-ItemProperty -Path \"HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl\" -Name \"Win32PrioritySeparation\" -Type DWord -Force -Value 36",
        "source_url": "https://www.reddit.com/r/MouseReview/comments/1iqwzp9/a_tweak_that_may_let_you_have_comfortable_mouse/?show=original",
        "tags": [
            "performance"
        ],
        "performance_level": 2
    },
    {
        "id": "disable-hpet",
        "title": "Disable HPET",
        "description": "HPET (High Precision Event Timer) seems to give mesurable improvement when disabled to FPS.",
        "warning": "Disabling it in the BIOS is a better way.",
        "code_apply": "bcdedit /deletevalue useplatformclock",
        "source_url": null,
        "tags": [
            "performance"
        ],
        "performance_level": 2
    },
    {
        "id": "reset-internet-connection-",
        "title": "Reset Internet Connection ",
        "description": "This will \"clean\" your internet config. Can be useful if you are facing connections problems ",
        "warning": null,
        "code_apply": `netsh winsock reset
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
ipconfig /flushdns`,
        "source_url": null,
        "tags": [
            "network"
        ],
        "performance_level": null
    },
    {
        "id": "disable-vbs-and-memory-integrity",
        "title": "Disable VBS and Memory Integrity",
        "description": "Virtualization-Based Security and Memory Integrity can use a lot of memory and CPU cycles. But this will impact your system security ",
        "warning": "This can be  a security risk",
        "code_apply": `# Disable Virtualization-Based Security (VBS) features
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" -Name "EnableVirtualizationBasedSecurity" -Value 0 -Type DWORD
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" -Name "RequirePlatformSecurityFeatures" -Value 0 -Type DWORD

# Disable Hypervisor-Enforced Code Integrity (HVCI/Memory Integrity)
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" -Name "Enabled" -Value 0 -Type DWORD -Force`,
        "source_url": null,
        "tags": [
            "performance"
        ],
        "performance_level": 3
    },
    {
        "id": "enable-bbrv2-",
        "title": "Enable BBRV2 ",
        "description": "BBRv2 Congestion control can give mesurable network speed increase. More info on the neat blog post in the source button",
        "warning": "Could be buggy on Windows 11 23H2 / 24H2+ ",
        "code_apply": `netsh int tcp set supplemental Template=Internet CongestionProvider=bbr2
netsh int tcp set supplemental Template=Datacenter CongestionProvider=bbr2
netsh int tcp set supplemental Template=Compat CongestionProvider=bbr2
netsh int tcp set supplemental Template=DatacenterCustom CongestionProvider=bbr2
netsh int tcp set supplemental Template=InternetCustom CongestionProvider=bbr2
netsh int ipv6 set gl loopbacklargemtu=disable
netsh int ipv4 set gl loopbacklargemtu=disable`,
        "source_url": "https://dev.moe/en/3021",
        "tags": [
            "network"
        ],
        "performance_level": null
    },
    {
        "id": "disable-accessibility-shortcuts",
        "title": "Disable accessibility shortcuts",
        "description": "Disable all accessibility shortcuts",
        "warning": null,
        "code_apply": `Set-ItemProperty -Path "HKCU:\\Control Panel\\Accessibility\\StickyKeys" -Name "Flags" -Type String -Value "506"
Set-ItemProperty -Path "HKCU:\\Control Panel\\Accessibility\\ToggleKeys" -Name "Flags" -Type String -Value "58"
Set-ItemProperty -Path "HKCU:\\Control Panel\\Accessibility\\Keyboard Response" -Name "Flags" -Type String -Value "122"`,
        "source_url": null,
        "tags": [
            "fix"
        ],
        "performance_level": null
    },
    {
        "id": "disable-spectre-and-meltdown-mitigation",
        "title": "Disable Spectre and Meltdown mitigation",
        "description": "Disable Spectre and Meltdown mitigation. This can improve performance at the cost of security.",
        "warning": "This can be a security risk",
        "code_apply": `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "FeatureSettingsOverride" /t REG_DWORD /d "3" /f
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "FeatureSettingsOverrideMask" /t REG_DWORD /d "3" /f`,
        "source_url": null,
        "tags": [
            "performance"
        ],
        "performance_level": 2
    }
];