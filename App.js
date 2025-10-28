const App = () => {
    const { useState, useEffect } = React;
    const [enabledTweaks, setEnabledTweaks] = useState(new Set());
    const [generatedScript, setGeneratedScript] = useState('');
    const [selectedTags, setSelectedTags] = useState(new Set());
    const [copyButtonText, setCopyButtonText] = useState('Share Config');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isWelcomePopupVisible, setIsWelcomePopupVisible] = useState(false);
    const [doNotShowAgainChecked, setDoNotShowAgainChecked] = useState(false);

    // Icons for each tag to make the UI more intuitive
    const tagIcons = {
        performance: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        ),
        fix: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        ),
        privacy: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        ),
        network: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 11a15.045 15.045 0 018.526 0M6 11a4.5 4.5 0 019 0" /></svg>
        ),
        advanced: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        ),
    };

    const allTags = [...new Set(TWEAKS_DATA.flatMap(tweak => tweak.tags))];
    const handleTagClick = (tag) => {
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            if (newSet.has(tag)) {
                newSet.delete(tag);
            } else {
                newSet.add(tag);
            }
            return newSet;
        });
    };

    const handleToggle = (tweakId) => {
        setEnabledTweaks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(tweakId)) {
                newSet.delete(tweakId);
            } else {
                newSet.add(tweakId);
            }
            return newSet;
        });
    };

    const generateScript = () => {
        const header = [
            'echo Script generated FOR FREE on https://bluethingy980.github.io/optimizer.github.io/ ;pause',
            `# PowerShell Tweak Script on TEMP_URL`,
            `# Timestamp: ${new Date().toISOString()}`,
            "# This will run as the script ad ADMIN",   
            "if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] \"Administrator\")) { Start-Process powershell.exe \"-NoProfile -ExecutionPolicy Bypass -File \`\"$PSCommandPath\`\"\" -Verb RunAs; exit }"
        ].join('\n');

        const selectedTweaks = TWEAKS_DATA.filter(tweak => enabledTweaks.has(tweak.id));
        const scriptBody = selectedTweaks.map(tweak => `# --- ${tweak.title} ---\n${tweak.code_apply}`);
        
        setGeneratedScript([header, ...scriptBody].join('\n\n'));
    };

    const handleConfirmDownload = () => {
        const blob = new Blob([generatedScript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tweaks.ps1';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsPopupVisible(false); // Close popup after download
    };

    const handleShare = () => {
        if (enabledTweaks.size === 0) {
            setCopyButtonText("No tweaks selected");
            setTimeout(() => setCopyButtonText('Share Config'), 2000);
            return;
        }
        const tweakIds = [...enabledTweaks].join(',');
        const url = new URL(window.location.href);
        url.searchParams.set('tweaks', tweakIds);

        navigator.clipboard.writeText(url.href).then(() => {
            setCopyButtonText('Copied to Clipboard!');
            setTimeout(() => setCopyButtonText('Share Config'), 2000);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
            setCopyButtonText('Copy Failed');
            setTimeout(() => setCopyButtonText('Share Config'), 2000);
        });
    };

    useEffect(() => {
        generateScript();
    }, [enabledTweaks]);

    const filteredTweaks = selectedTags.size === 0
        ? TWEAKS_DATA
        : TWEAKS_DATA.filter(tweak => tweak.tags.some(tag => selectedTags.has(tag)));

    // Effect to load tweaks from URL on initial render
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tweaksFromUrl = urlParams.get('tweaks');
        if (tweaksFromUrl) {
            const tweakIds = tweaksFromUrl.split(',');
            setEnabledTweaks(new Set(tweakIds));
        }
    }, []);

    // Effect for the welcome popup
    useEffect(() => {
        const hidePopup = localStorage.getItem('hideWelcomePopup');
        if (hidePopup === 'true') {
            // If it was previously set to hide, don't show the popup, but reflect the checkbox state
            setIsWelcomePopupVisible(false);
            setDoNotShowAgainChecked(true);
        } else {
            // If not set to hide (null, undefined, or 'false'), show the popup and ensure checkbox is unchecked
            setIsWelcomePopupVisible(true);
            setDoNotShowAgainChecked(false);
        }
    }, []);

    const handleToggleDoNotShowAgain = (e) => {
        const isChecked = e.target.checked;
        setDoNotShowAgainChecked(isChecked);
        localStorage.setItem('hideWelcomePopup', isChecked ? 'true' : 'false');
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 lg:p-8">
            <div className="max-w-1xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* This div seems to have a typo in the class name `max-w-1xl`. It should probably be `max-w-7xl` or another valid Tailwind class. I'll leave it as is to stick to the request. */}
                <div className="lg:col-span-2 pb-300">
                    <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
                        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            
                        </span> Script Generator
                    </h1>
                    <h2 className="text-sm font-semibold text-gray-400 mb-2">Filter by Tag</h2>
                    <div className="flex items-center justify-center lg:justify-start mb-6 space-x-2 bg-gray-800/50 py-2 rounded-lg">
                        {allTags.map(tag => (
                            <button key={tag} onClick={() => handleTagClick(tag)} className={`flex items-center capitalize px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedTags.has(tag) ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                                {tagIcons[tag] || null}
                                <span>{tag}</span>
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTweaks.map(tweak => (
                                <div key={tweak.id} className={`bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-200 border flex flex-col ${enabledTweaks.has(tweak.id) ? 'border-blue-600' : 'border-gray-700'}`} onClick={() => handleToggle(tweak.id)}>
                                <div className="flex-grow">
                                    <h2 className="text-base font-bold">{tweak.title}</h2>
                                    <p className="text-xs text-gray-400 mt-1">{tweak.description}</p>
                                    {tweak.warning && <p className="text-xs text-yellow-500 mt-2">{tweak.warning}</p>}
                                </div>
                                <hr className="border-gray-700 my-3" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {tweak.tags && tweak.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full mr-2">{tag}</span>
                                        ))}
                                        <div className="flex items-center">
                                            {tweak.performance_level && (
                                                <div className="flex items-center text-xs text-gray-400" title={`Performance Level: ${tweak.performance_level} of 3`}>
                                                    <span className="mr-1">⚡</span> {tweak.performance_level}
                                                </div>
                                            )}
                                            {tweak.source_url && (
                                                <a href={tweak.source_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} title="View Source" className={`${tweak.performance_level ? 'ml-2' : ''} text-gray-400 hover:text-blue-400`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <label className="switch" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" checked={enabledTweaks.has(tweak.id)} onChange={() => handleToggle(tweak.id)} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* --- Redesigned Script Panel --- */}
                <div className="lg:sticky lg:top-8 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col lg:max-h-[calc(100vh-4rem)]">
                    <h2 className="text-lg font-bold mb-4">Generated Script</h2>
                    <SyntaxHighlighter code={generatedScript} className="flex-grow min-h-0" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center" onClick={() => setIsPopupVisible(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download</span>
                        </button>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center" onClick={handleShare} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span>{copyButtonText}</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Download Popup/Modal */}
            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto border border-gray-700">
                        <h3 className="text-xl font-bold mb-4">Avoid sharing script file</h3>
                        <div className="text-gray-300 mb-6 space-y-3">
                            <p>
                                Please avoid sharing the .PS1 file itself. Its better to <b>share the config URL</b> with the green share config button. It will provide context to the one you share. 
                            </p> 
                        </div>
                        <h3 className="text-xl font-bold mb-4">How to use the script</h3>
                        <div className="text-gray-300 mb-6 space-y-3">
                            <p className="bg-gray-900 p-3 rounded-md text-sm">
                                1. Right-click the downloaded <code className="text-yellow-400">tweaks.ps1</code> file.<br/>
                                2. Select "Run with PowerShell".<br/>
                                3. Approve the administrator prompt.
                            </p>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setIsPopupVisible(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold transition-colors">Cancel</button>
                            <button onClick={handleConfirmDownload} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold flex items-center transition-colors">Confirm Download</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Welcome Popup */}
            {isWelcomePopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto border border-gray-700">
                        <h3 className="text-xl font-bold mb-4">⚠ Read me</h3>
                        <div className="text-gray-300 mb-6 space-y-3">
                            <p>
                                This tool is <b>free</b>. In return I would be grateful for you to not brand these scripts as your own. You can share a config as your own not the tool.
                            </p>
                            <p>
                                Please <b>be careful</b> before applying a tweak. <b>Read the description</b> and check the generated script. Unlike others tools you can see exacly what this will do on your PC. 
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="doNotShowAgain"
                                    className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    checked={doNotShowAgainChecked}
                                    onChange={handleToggleDoNotShowAgain}
                                />
                                <label htmlFor="doNotShowAgain" className="ml-2 text-gray-300 select-none">Do not show again</label>
                            </div>
                            <button onClick={() => setIsWelcomePopupVisible(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
