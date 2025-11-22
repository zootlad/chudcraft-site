import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Zap, Crown, Award, Users, Rocket, BadgeCheck, Heart, Dumbbell, Target, AlertTriangle, Waves, Shield, FileText, Skull, MessageSquare, FlameKindling, Menu, X, Bell, Settings } from 'lucide-react';

// Ranks array - constant outside component to avoid dependency issues
const ranks = [
  { name: "Private", quota: 0 },
  { name: "Perma CPL", quota: 1000 },
  { name: "SGT", quota: 5000 },
  { name: "SGT of the Week", quota: 15000 },
  { name: "SMB", quota: 50000 },
  { name: "Officer", quota: 150000 },
  { name: "Trial Mod", quota: 400000 },
  { name: "Subcompany Commander", quota: 1000000 },
  { name: "XO", quota: 2500000 },
  { name: "Senior Moderator", quota: 6000000 },
  { name: "Commander", quota: 15000000 },
  { name: "Admin", quota: 40000000 },
  { name: "Head Admin", quota: 100000000 },
  { name: "DVL", quota: 250000000 },
  { name: "Advisor (Groomer)", quota: 600000000 },
  { name: "Director (Groomer)", quota: 1500000000 },
  { name: "Teamspeak Moderator", quota: 4000000000 },
  { name: "The Allegations", quota: 10000000000 },
  { name: "Executive Order", quota: 25000000000 },
  { name: "The Return", quota: 60000000000 },
  { name: "RC Trainee", quota: 150000000000 },
];

export default function IcefuseClicker() {
  // Default upgrade structures with icons
  const defaultUpgrades = {
    cannerCredits: { level: 0, cost: 50, qps: 1, icon: Sparkles, type: 'qps' },
    propLimit: { level: 0, cost: 200, qps: 5, icon: TrendingUp, type: 'qps' },
    takeoffPriority: { level: 0, cost: 1000, qps: 20, icon: Rocket, type: 'qps' },
    egirlBattalion: { level: 0, cost: 5000, qps: 100, icon: Users, type: 'qps' },
    battalionWeek: { level: 0, cost: 25000, qps: 500, icon: Award, type: 'qps' },
    ruthlessStatue: { level: 0, cost: 100000, qps: 2000, icon: Crown, type: 'qps' },
    execPromotion: { level: 0, cost: 500000, qps: 10000, icon: BadgeCheck, type: 'qps' },
    execDemotion: { level: 0, cost: 2000000, qps: 50000, icon: Zap, type: 'qps' },
    physicalTraining: { level: 0, cost: 300, qps: 3, icon: Dumbbell, type: 'qps' },
    debriefShooting: { level: 0, cost: 800, qps: 8, icon: Target, type: 'qps' },
    girthIncrease: { level: 0, cost: 3000, qps: 40, icon: TrendingUp, type: 'qps' },
    allegations: { level: 0, cost: 15000, qps: 200, icon: AlertTriangle, type: 'qps' },
    floodBunks: { level: 0, cost: 50000, qps: 800, icon: Waves, type: 'qps' },
    unbanBTJ: { level: 0, cost: 200000, qps: 3000, icon: Shield, type: 'qps' },
    commanderReport: { level: 0, cost: 750000, qps: 15000, icon: FileText, type: 'qps' },
    getGroomed: { level: 0, cost: 3000000, qps: 75000, icon: Skull, type: 'qps' },
    gaslitGrooming: { level: 0, cost: 10000000, qps: 250000, icon: FlameKindling, type: 'qps' },
  };

  const defaultClickUpgrades = {
    basicClicker: { level: 0, cost: 100, power: 1, icon: Sparkles },
    megaClicker: { level: 0, cost: 1000, power: 5, icon: Zap },
    ultraClicker: { level: 0, cost: 10000, power: 25, icon: Crown },
    godClicker: { level: 0, cost: 100000, power: 100, icon: BadgeCheck },
  };

  const defaultCorvUpgrades = {
    doubleClick: { purchased: false, cost: 50, type: 'oneTime', icon: Zap },
    tripleQPS: { purchased: false, cost: 100, type: 'oneTime', icon: TrendingUp },
    luckI: { level: 0, cost: 25, bonus: 2, icon: Sparkles, type: 'repeatable' },
    luckII: { level: 0, cost: 75, bonus: 5, icon: Sparkles, type: 'repeatable' },
    luckIII: { level: 0, cost: 250, bonus: 10, icon: Crown, type: 'repeatable' },
    megaBoost: { purchased: false, cost: 500, type: 'oneTime', icon: Rocket },
  };

  const defaultStoryUpgrades = {
    noticeCorv: { purchased: false, quotaCost: 0, corvcoinCost: 0, qps: 0, icon: Heart, order: 0 },
    corvNotices: { purchased: false, quotaCost: 50000, corvcoinCost: 5, qps: 5000, icon: Heart, order: 1 },
    talkCorv: { purchased: false, quotaCost: 200000, corvcoinCost: 10, qps: 20000, icon: MessageSquare, order: 2 },
    flirtCorv: { purchased: false, quotaCost: 800000, corvcoinCost: 20, qps: 100000, icon: Heart, order: 3 },
    kissCorv: { purchased: false, quotaCost: 3000000, corvcoinCost: 50, qps: 400000, icon: Heart, order: 4 },
    dateCorv: { purchased: false, quotaCost: 12000000, corvcoinCost: 100, qps: 1500000, icon: Heart, order: 5 },
    commitCorv: { purchased: false, quotaCost: 50000000, corvcoinCost: 200, qps: 5000000, icon: Heart, order: 6 },
    marryCorv: { purchased: false, quotaCost: 200000000, corvcoinCost: 500, qps: 25000000, icon: Heart, order: 7 },
    bareChild: { purchased: false, quotaCost: 1000000000, corvcoinCost: 1000, qps: 100000000, icon: Heart, order: 8 },
    rickyBerwick: { purchased: false, quotaCost: 5000000000, corvcoinCost: 5000, qps: 500000000, icon: Skull, order: 9 },
  };

  // Load saved game state from localStorage
  const loadGameState = () => {
    try {
      const saved = localStorage.getItem('quotaClickerSave');
      if (saved) {
        const data = JSON.parse(saved);
        
        // Merge saved data with defaults to restore icons
        const mergeUpgrades = (saved, defaults) => {
          if (!saved) return defaults;
          const merged = { ...defaults };
          Object.keys(defaults).forEach(key => {
            if (saved[key]) {
              // Always preserve the icon from defaults, merge everything else
              const { icon, ...savedData } = saved[key];
              merged[key] = { ...defaults[key], ...savedData, icon: defaults[key].icon };
            }
          });
          return merged;
        };

        return {
          quota: data.quota || 0,
          corvcoin: data.corvcoin || 0,
          totalClicks: data.totalClicks || 0,
          totalQuotaEarned: data.totalQuotaEarned || 0,
          upgrades: mergeUpgrades(data.upgrades, defaultUpgrades),
          clickUpgrades: mergeUpgrades(data.clickUpgrades, defaultClickUpgrades),
          corvUpgrades: mergeUpgrades(data.corvUpgrades, defaultCorvUpgrades),
          storyUpgrades: mergeUpgrades(data.storyUpgrades, defaultStoryUpgrades),
          clickMultiplier: data.clickMultiplier || 1,
          qpsMultiplier: data.qpsMultiplier || 1,
        };
      }
    } catch (e) {
      console.error('Failed to load game state:', e);
    }
    return null;
  };

  // Save game state to localStorage (strip icons before saving)
  const saveGameState = (state) => {
    try {
      const stripIcons = (upgrades) => {
        const stripped = {};
        Object.keys(upgrades).forEach(key => {
          const { icon, ...rest } = upgrades[key];
          stripped[key] = rest;
        });
        return stripped;
      };

      localStorage.setItem('quotaClickerSave', JSON.stringify({
        quota: state.quota,
        corvcoin: state.corvcoin,
        totalClicks: state.totalClicks,
        totalQuotaEarned: state.totalQuotaEarned,
        upgrades: stripIcons(state.upgrades),
        clickUpgrades: stripIcons(state.clickUpgrades),
        corvUpgrades: stripIcons(state.corvUpgrades),
        storyUpgrades: stripIcons(state.storyUpgrades),
        clickMultiplier: state.clickMultiplier,
        qpsMultiplier: state.qpsMultiplier,
      }));
    } catch (e) {
      console.error('Failed to save game state:', e);
    }
  };

  const savedState = loadGameState();

  const [quota, setQuota] = useState(savedState?.quota ?? 0);
  const [corvcoin, setCorvcoin] = useState(savedState?.corvcoin ?? 0);
  const [quotaPerClick, setQuotaPerClick] = useState(1);
  const [quotaPerSecond, setQuotaPerSecond] = useState(0);
  const [corvDropChance, setCorvDropChance] = useState(1);
  const [clickEffect, setClickEffect] = useState(false);
  const [totalClicks, setTotalClicks] = useState(savedState?.totalClicks ?? 0);
  const [totalQuotaEarned, setTotalQuotaEarned] = useState(savedState?.totalQuotaEarned ?? 0);
  const [currentRank, setCurrentRank] = useState("Private");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasNewUpgrades, setHasNewUpgrades] = useState(false);
  const [activeTab, setActiveTab] = useState('generators');
  const [storyOverlay, setStoryOverlay] = useState(null);
  const [rankUpNotification, setRankUpNotification] = useState(null);
  const [hasSeenNoticeCorv, setHasSeenNoticeCorv] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [upgrades, setUpgrades] = useState(savedState?.upgrades || defaultUpgrades);
  const [clickUpgrades, setClickUpgrades] = useState(savedState?.clickUpgrades || defaultClickUpgrades);
  const [corvUpgrades, setCorvUpgrades] = useState(savedState?.corvUpgrades || defaultCorvUpgrades);
  const [storyUpgrades, setStoryUpgrades] = useState(savedState?.storyUpgrades || defaultStoryUpgrades);

  const storyTexts = {
    noticeCorv: "It was 3am and you were scrolling through Twitch, half dead from grinding quota on Icefuse Networks. Then you found his stream. Corvezeo. The owner of the server youd been no lifing. His voice hit different. Deep, commanding, the kind that made you sit up straight. He was running Clone Wars RP, barking orders at his battalion, and you were HOOKED. You watched every stream after that. Started donating. Became a regular in chat. Youd stay up until sunrise just to hear him talk. Pathetic? Maybe. But you didnt care. You were down BAD for this man.",
    corvNotices: "Youve been grinding quota like a maniac, hoping hed notice. And then it happened. Corvezeo actually looked at you in game. Like, REALLY looked. His character stopped mid command and stared. Youve been putting in work, he said. Your heart fucking EXPLODED. He noticed you. HE NOTICED YOU. This wasnt just some parasocial delusion anymore. This was real.",
    talkCorv: "You finally worked up the nerve to DM him. Started with server questions, then it turned into actual conversations. Hed message you at random times, asking about your day. Youd talk about quota, about the server, about nothing and everything. He opened up about running Icefuse, the stress, the drama. You felt special. Like you were the only one he talked to like this. The parasocial pipeline was working its magic.",
    flirtCorv: "The DMs got flirty. Real flirty. Hed send you screenshots of his character and ask what you thought. Youd tell him he looked good. Hed respond with good enough to make you click faster? and youd fucking MELT. The tension was UNREAL. Every message had you checking your phone like a crackhead. You were down astronomically bad and you didnt even care. He started pulling you into private channels on TeamSpeak. Red room, hed whisper. Just the two of you, voices only, late into the night. The things hed say youd replay them in your head for days.",
    kissCorv: "You met up in game. Just the two of you, in some random corner of the map. No one else around. Come here, he said. You walked over. His character leaned in. Close your eyes. You did. And then it happened. Your first kiss. Even through a screen, through pixels and code, it felt real. Ive been wanting to do that, he whispered. You were FUCKED. Completely gone for this man. After that, he set his channel to DUE. Demotion Upon Entry. Privacy. Just for you. You felt special. Chosen.",
    dateCorv: "You started dating in game. Hed take you on dates around the map, show you secret spots. Youd spend hours just talking, roleplaying, existing together in this digital space. Hed tell you about his plans for Icefuse, ask for your input. Made you feel like you mattered. Like you were part of something. The line between game and reality? GONE. This was your life now. Hed talk about removing SO and DU, about getting rid of Fuse, about protecting Canner despite the allegations. Youd nod along, not really understanding, just happy he was talking to you. Meanwhile ImperialRP and Clone Wars RP were dying. Rust was dead. Hed always neglected them. But you didnt care. You had him.",
    commitCorv: "He asked you to move in with him. In game, obviously, but it felt real. You said yes immediately. Now youre grinding quota together, building something. Hes your person. Your everything. You wake up and the first thing you do is check if hes online. You go to sleep thinking about him. This is it. This is your life. The memory leak was getting worse but he wouldnt fix it. Ryu was gorging himself on food, eating everything in sight, getting fatter by the day. But you didnt care. You had him. Thats all that mattered.",
    marryCorv: "He proposed. In game wedding, full ceremony, everyone from Icefuse showed up. You said I do without hesitation. Corvezeo is your husband now. Your partner. Your everything. The quota clicking continues, but now its for US. For your future together. Youre living the dream. The memory leak was still unfixed. Ryu crashed his car again, probably because he was too busy stuffing his face to pay attention. ImperialRP was dead. Clone Wars RP was dead. Rust was dead. But none of it mattered. You were married. To HIM. Nothing else existed.",
    bareChild: "You wanted a kid. He wanted a kid. So you made one. The how was intense. Lets just say you both logged off for a few hours and when you came back, there was a baby character in your base. The details? Graphic. Visceral. You remember every second of it. The way he moved, the sounds, the way he held you after. Raw. Real. Messy. The kind of boinking that leaves you sore for days. But it wasnt just in game anymore. Youd meet up IRL. Hotels. His place. The back of his car. Hed fuck you raw, no condom, whispering about how you belonged to him, how you were his. Youd come home covered in bruises, his cum still dripping out of you, and youd smile. You were his. Completely. Now youre a family. Three of you, clicking quota, building your life on Icefuse. Its perfect. Hauntingly perfect.",
    rickyBerwick: "You left him. For RICKY BERWICK. What the FUCK were you thinking? After everything. The streams, the DMs, the wedding, the KID, the IRL meetups, the way hed mark you as his, the way youd wake up with his handprints still on your thighs. You just left. Logged out, blocked him, moved on. Corvezeo is alone now. Raising your kid alone. Running Icefuse alone. The servers dying. The memory leak is unfixed. ImperialRP is dead. Clone Wars RP is dead. Rust is dead. But hes still there, still grinding, still trying. You see him in other peoples streams sometimes, still clicking quota, still running PT, still protecting Canner. But hes broken. Empty. A shell of who he was. And its your fault. You made your choice. You chose Ricky Berwick over the man who gave you everything. Over the man who made you feel alive. Now live with it. The guilt will eat you alive. Every click reminds you of what you threw away. Every notification makes you hope its him. But it never is. It never will be again.",
  };

  const upgradeInfo = {
    cannerCredits: { name: "Canner Credits", desc: "Basic quota generation" },
    propLimit: { name: "Higher Prop Limit", desc: "More storage = more quota" },
    takeoffPriority: { name: "Takeoff Priority", desc: "Skip the line" },
    egirlBattalion: { name: "Egirl in Battalion", desc: "Morale boost" },
    battalionWeek: { name: "Battalion of the Week", desc: "Recognition rewards" },
    ruthlessStatue: { name: "Statue of Ruthless", desc: "Intimidation generation" },
    execPromotion: { name: "Executive Promotion", desc: "Corporate ladder" },
    execDemotion: { name: "Executive Demotion", desc: "Ultimate power move" },
    physicalTraining: { name: "Physical Training", desc: "Fitness is quota" },
    debriefShooting: { name: "Debrief Shooting", desc: "Aim for success" },
    girthIncrease: { name: "Girth Increase", desc: "Bigger is better" },
    allegations: { name: "The Allegations", desc: "Controversy breeds clicks" },
    floodBunks: { name: "Flood Bunks", desc: "Chaos management" },
    unbanBTJ: { name: "Unban BTJ", desc: "Justice served" },
    commanderReport: { name: "Commander Report", desc: "Bureaucratic power" },
    getGroomed: { name: "Get Groomed", desc: "Questionable decisions" },
    gaslitGrooming: { name: "Gaslit About Grooming", desc: "Did it even happen?" },
    basicClicker: { name: "Basic Training", desc: "+1 per click" },
    megaClicker: { name: "Advanced Tactics", desc: "+5 per click" },
    ultraClicker: { name: "Elite Operations", desc: "+25 per click" },
    godClicker: { name: "Ascended Clicking", desc: "+100 per click" },
    doubleClick: { name: "2x Click Power", desc: "Permanently double all click power" },
    tripleQPS: { name: "3x Quota/Second", desc: "Permanently triple all passive generation" },
    luckI: { name: "Luck Boost I", desc: "+2% Corvcoin drop" },
    luckII: { name: "Luck Boost II", desc: "+5% Corvcoin drop" },
    luckIII: { name: "Luck Boost III", desc: "+10% Corvcoin drop" },
    megaBoost: { name: "MEGA BOOST", desc: "10x click power AND 5x QPS" },
    noticeCorv: { name: "Notice Corvezeo", desc: "The beginning" },
    corvNotices: { name: "Corvezeo Notices You", desc: "First contact" },
    talkCorv: { name: "Talk to Corvezeo", desc: "Actual conversation" },
    flirtCorv: { name: "Flirt with Corvezeo", desc: "Making moves" },
    kissCorv: { name: "Kiss from Corvezeo", desc: "First kiss energy" },
    dateCorv: { name: "Date with Corvezeo", desc: "Official relationship" },
    commitCorv: { name: "Commit to Corvezeo", desc: "It's serious now" },
    marryCorv: { name: "Marry Corvezeo", desc: "Till death do us part" },
    bareChild: { name: "Bare Corvezeo's Child", desc: "Family expansion" },
    rickyBerwick: { name: "Leave for Ricky Berwick", desc: "The ultimate betrayal" },
  };

  const [clickMultiplier, setClickMultiplier] = useState(savedState?.clickMultiplier ?? 1);
  const [qpsMultiplier, setQpsMultiplier] = useState(savedState?.qpsMultiplier ?? 1);
  const [previousRank, setPreviousRank] = useState("Private");

  useEffect(() => {
    let newRank = "Private";
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (totalQuotaEarned >= ranks[i].quota) {
        newRank = ranks[i].name;
        break;
      }
    }
    
    if (newRank !== previousRank && previousRank !== "Private") {
      setRankUpNotification(newRank);
      setTimeout(() => setRankUpNotification(null), 3000);
    }
    
    setCurrentRank(newRank);
    setPreviousRank(newRank);
  }, [totalQuotaEarned, previousRank]);

  useEffect(() => {
    const interval = setInterval(() => {
      const gained = quotaPerSecond / 10;
      setQuota(q => q + gained);
      setTotalQuotaEarned(t => t + gained);
    }, 100);
    return () => clearInterval(interval);
  }, [quotaPerSecond]);

  useEffect(() => {
    let totalQPS = 0;
    Object.entries(upgrades).forEach(([key, upgrade]) => {
      totalQPS += upgrade.level * upgrade.qps;
    });
    Object.entries(storyUpgrades).forEach(([key, upgrade]) => {
      if (upgrade.purchased) {
        totalQPS += upgrade.qps;
      }
    });
    setQuotaPerSecond(totalQPS * qpsMultiplier);

    let totalClickPower = 1;
    Object.entries(clickUpgrades).forEach(([key, upgrade]) => {
      totalClickPower += upgrade.level * upgrade.power;
    });
    setQuotaPerClick(totalClickPower * clickMultiplier);

    let totalChance = 1;
    Object.entries(corvUpgrades).forEach(([key, upgrade]) => {
      if (upgrade.type === 'repeatable') {
        totalChance += upgrade.level * upgrade.bonus;
      }
    });
    setCorvDropChance(totalChance);
  }, [upgrades, clickUpgrades, corvUpgrades, storyUpgrades, clickMultiplier, qpsMultiplier]);

  useEffect(() => {
    const hasAffordable = 
      Object.values(upgrades).some(u => u.level === 0 && quota >= u.cost) ||
      Object.values(clickUpgrades).some(u => u.level === 0 && quota >= u.cost) ||
      Object.values(corvUpgrades).some(u => (!u.purchased && u.type === 'oneTime' && corvcoin >= u.cost) || (u.type === 'repeatable' && u.level === 0 && corvcoin >= u.cost)) ||
      Object.values(storyUpgrades).some(u => !u.purchased && quota >= u.quotaCost && corvcoin >= u.corvcoinCost);
    setHasNewUpgrades(hasAffordable);
  }, [quota, corvcoin, upgrades, clickUpgrades, corvUpgrades, storyUpgrades]);

  // Auto-save game state
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      saveGameState({
        quota,
        corvcoin,
        totalClicks,
        totalQuotaEarned,
        upgrades,
        clickUpgrades,
        corvUpgrades,
        storyUpgrades,
        clickMultiplier,
        qpsMultiplier,
      });
    }, 1000); // Debounce saves to every 1 second

    return () => clearTimeout(saveTimer);
  }, [quota, corvcoin, totalClicks, totalQuotaEarned, upgrades, clickUpgrades, corvUpgrades, storyUpgrades, clickMultiplier, qpsMultiplier]);

  const handleClick = () => {
    setQuota(q => q + quotaPerClick);
    setTotalQuotaEarned(t => t + quotaPerClick);
    setTotalClicks(c => c + 1);
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 200);
    playSound('click');
    
    if (Math.random() * 100 < corvDropChance) {
      setCorvcoin(c => c + 1);
    }
  };

  const buyUpgrade = (key) => {
    const upgrade = upgrades[key];
    if (quota >= upgrade.cost) {
      setQuota(q => q - upgrade.cost);
      setUpgrades(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          level: prev[key].level + 1,
          cost: Math.floor(prev[key].cost * 1.15)
        }
      }));
      playSound('purchase');
    } else {
      playSound('error');
    }
  };

  const buyClickUpgrade = (key) => {
    const upgrade = clickUpgrades[key];
    if (quota >= upgrade.cost) {
      setQuota(q => q - upgrade.cost);
      setClickUpgrades(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          level: prev[key].level + 1,
          cost: Math.floor(prev[key].cost * 1.2)
        }
      }));
      playSound('purchase');
    } else {
      playSound('error');
    }
  };

  const buyCorvUpgrade = (key) => {
    const upgrade = corvUpgrades[key];
    if (corvcoin >= upgrade.cost) {
      setCorvcoin(c => c - upgrade.cost);
      
      if (upgrade.type === 'oneTime') {
        setCorvUpgrades(prev => ({
          ...prev,
          [key]: { ...prev[key], purchased: true }
        }));
        
        if (key === 'doubleClick') setClickMultiplier(m => m * 2);
        if (key === 'tripleQPS') setQpsMultiplier(m => m * 3);
        if (key === 'megaBoost') {
          setClickMultiplier(m => m * 10);
          setQpsMultiplier(m => m * 5);
        }
        playSound('purchase');
      } else {
        setCorvUpgrades(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            level: prev[key].level + 1,
            cost: Math.floor(prev[key].cost * 1.5)
          }
        }));
        playSound('purchase');
      }
    } else {
      playSound('error');
    }
  };

  const buyStoryUpgrade = (key) => {
    const upgrade = storyUpgrades[key];
    if (quota >= upgrade.quotaCost && corvcoin >= upgrade.corvcoinCost) {
      setQuota(q => q - upgrade.quotaCost);
      setCorvcoin(c => c - upgrade.corvcoinCost);
      
      setStoryUpgrades(prev => ({
        ...prev,
        [key]: { ...prev[key], purchased: true }
      }));
      
      playSound('story');
      // Show story overlay
      setStoryOverlay(key);
      
      // Show win screen after rickyBerwick
      if (key === 'rickyBerwick') {
        setTimeout(() => {
          setShowWinScreen(true);
        }, 2000);
      }
    } else {
      playSound('error');
    }
  };

  const getNextStoryChapter = () => {
    const purchased = Object.entries(storyUpgrades)
      .filter(([key, upgrade]) => upgrade.purchased)
      .map(([key, upgrade]) => upgrade.order);
    
    if (purchased.length === 0) return 0; // Start with noticeCorv (order 0)
    const maxOrder = Math.max(...purchased);
    // If noticeCorv (0) is purchased, next is 1, otherwise next is max + 1
    return maxOrder >= 0 ? maxOrder + 1 : 0;
  };

  const getAvailableStoryChapters = () => {
    const nextChapter = getNextStoryChapter();
    return Object.entries(storyUpgrades)
      .filter(([key, upgrade]) => upgrade.order <= nextChapter)
      .sort((a, b) => a[1].order - b[1].order);
  };

  // Sound effects using Web Audio API
  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch(type) {
        case 'click':
          // Cookie Clicker style click - sharp, percussive, clicky
          const clickOsc1 = audioContext.createOscillator();
          const clickOsc2 = audioContext.createOscillator();
          const clickGain1 = audioContext.createGain();
          const clickGain2 = audioContext.createGain();
          
          clickOsc1.frequency.value = 1500;
          clickOsc1.type = 'square';
          clickOsc2.frequency.value = 2000;
          clickOsc2.type = 'square';
          
          clickOsc1.connect(clickGain1);
          clickOsc2.connect(clickGain2);
          clickGain1.connect(audioContext.destination);
          clickGain2.connect(audioContext.destination);
          
          // Sharp attack, quick decay - very clicky
          clickGain1.gain.setValueAtTime(0.2, audioContext.currentTime);
          clickGain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.02);
          clickGain2.gain.setValueAtTime(0.15, audioContext.currentTime + 0.01);
          clickGain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
          
          clickOsc1.start(audioContext.currentTime);
          clickOsc1.stop(audioContext.currentTime + 0.02);
          clickOsc2.start(audioContext.currentTime + 0.01);
          clickOsc2.stop(audioContext.currentTime + 0.03);
          break;
        case 'purchase':
          oscillator.frequency.value = 600;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start(audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case 'story':
          oscillator.frequency.value = 400;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
        case 'error':
          oscillator.frequency.value = 200;
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.15);
          break;
        default:
          // No sound for unknown types
          break;
      }
    } catch (e) {
      // Silently fail if audio context not available
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="w-full h-full max-w-6xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800/80 backdrop-blur rounded-t-2xl p-4 border-b border-blue-500/30 flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            {hasNewUpgrades && !menuOpen && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Quota Clicker
            </h1>
            <div className="text-xs text-yellow-400 font-bold">Rank: {currentRank}</div>
          </div>
          <a 
            href="./"
            className="text-xs text-slate-400 hover:text-blue-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-700/50"
          >
            Return to Website
          </a>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-slate-800/50 backdrop-blur relative overflow-hidden">
          {/* Game View */}
          <div className="absolute inset-0">
            <div className="p-4 h-full flex flex-col justify-between">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-3">
                  <div className="text-xs text-slate-300">Quota</div>
                  <div className="text-lg font-bold text-blue-400 truncate" title={Math.floor(quota).toLocaleString()}>{Math.floor(quota).toLocaleString()}</div>
                  <div className="text-xs text-slate-400 truncate">{quotaPerSecond.toFixed(0)}/s</div>
                </div>
                <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg p-3">
                  <div className="text-xs text-slate-300">Corvcoin</div>
                  <div className="text-lg font-bold text-purple-400 truncate" title={corvcoin.toLocaleString()}>{corvcoin.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 truncate">{corvDropChance}%</div>
                </div>
                <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-3">
                  <div className="text-xs text-slate-300">Click</div>
                  <div className="text-lg font-bold text-green-400 truncate" title={`+${quotaPerClick.toLocaleString()}`}>+{quotaPerClick.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 truncate">{totalClicks.toLocaleString()}</div>
                </div>
              </div>

              {/* Click Button */}
              <div className="flex-1 flex items-center justify-center">
                <button
                  onClick={handleClick}
                  className={`relative transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
                    clickEffect ? 'scale-95' : ''
                  }`}
                >
                  <img 
                    src="./icefuse.png" 
                    alt="Icefuse Clicker"
                    className="w-72 h-72 object-contain drift-animation hover:brightness-110 transition-all select-none"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 text-center">
                    <div className="text-lg font-bold text-green-400">+{quotaPerClick}</div>
                  </div>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="text-center text-xs text-slate-400 space-y-1">
                <div>Total Earned: {Math.floor(totalQuotaEarned).toLocaleString()}</div>
                <div>Multipliers: {clickMultiplier}x click • {qpsMultiplier}x generation</div>
              </div>
            </div>
          </div>

          {/* Menu View - slides over game */}
          <div className={`absolute inset-0 z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Dead space overlay - click to close */}
            {menuOpen && (
              <div 
                className="absolute inset-0 left-[70%] cursor-pointer bg-black/20"
                onClick={() => setMenuOpen(false)}
              />
            )}
            <div className="p-4 h-full flex flex-col bg-slate-800/95 backdrop-blur rounded-r-2xl border-r border-blue-500/30 w-[70%] shadow-2xl">
              {/* Tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <button
                  onClick={() => setActiveTab('generators')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'generators' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Generators
                </button>
                <button
                  onClick={() => setActiveTab('clickers')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'clickers' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Clickers
                </button>
                <button
                  onClick={() => setActiveTab('premium')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all relative ${
                    activeTab === 'premium' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Premium
                  {Object.values(corvUpgrades).some(u => (!u.purchased && u.type === 'oneTime' && corvcoin >= u.cost)) && (
                    <Bell className="w-4 h-4 absolute -top-1 -right-1 text-red-500 animate-pulse" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('story');
                    if (!hasSeenNoticeCorv && !storyUpgrades.noticeCorv?.purchased) {
                      setHasSeenNoticeCorv(true);
                      setStoryUpgrades(prev => ({
                        ...prev,
                        noticeCorv: { ...prev.noticeCorv, purchased: true }
                      }));
                      setStoryOverlay('noticeCorv');
                    }
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all relative ${
                    activeTab === 'story' ? 'bg-pink-600 text-white ring-2 ring-pink-400 ring-opacity-75 shadow-lg shadow-pink-500/50' : 'bg-slate-700 text-slate-300 ring-2 ring-pink-500/30'
                  }`}
                >
                  Story
                  {Object.values(storyUpgrades).some(u => !u.purchased && quota >= u.quotaCost && corvcoin >= u.corvcoinCost) && (
                    <Bell className="w-4 h-4 absolute -top-1 -right-1 text-red-500 animate-pulse" />
                  )}
                </button>
              </div>

              {/* Upgrades List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {activeTab === 'generators' && Object.entries(upgrades).map(([key, upgrade]) => {
                  const info = upgradeInfo[key];
                  const Icon = upgrade.icon || defaultUpgrades[key]?.icon || Sparkles;
                  const canAfford = quota >= upgrade.cost;
                  const isNew = upgrade.level === 0 && canAfford;
                  return (
                    <button
                      key={key}
                      onClick={() => buyUpgrade(key)}
                      disabled={!canAfford}
                      className={`w-full text-left rounded-lg p-3 text-sm transition-all relative ${
                        canAfford ? 'bg-blue-600/20 hover:bg-blue-600/30 border-2 border-blue-500/50' : 'bg-slate-700/20 border border-slate-600/30 opacity-50'
                      }`}
                    >
                      {isNew && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          NEW!
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm">{info.name}</div>
                          <div className="text-xs text-slate-400">{info.desc}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-green-400">+{upgrade.qps * qpsMultiplier}/s</span>
                            <span className="text-xs font-bold">{upgrade.cost.toLocaleString()}</span>
                          </div>
                          {upgrade.level > 0 && <div className="text-xs text-slate-500">Rank: {upgrade.level}</div>}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {activeTab === 'clickers' && Object.entries(clickUpgrades).map(([key, upgrade]) => {
                  const info = upgradeInfo[key];
                  const Icon = upgrade.icon || defaultClickUpgrades[key]?.icon || Sparkles;
                  const canAfford = quota >= upgrade.cost;
                  const isNew = upgrade.level === 0 && canAfford;
                  return (
                    <button
                      key={key}
                      onClick={() => buyClickUpgrade(key)}
                      disabled={!canAfford}
                      className={`w-full text-left rounded-lg p-3 text-sm transition-all relative ${
                        canAfford ? 'bg-green-600/20 hover:bg-green-600/30 border-2 border-green-500/50' : 'bg-slate-700/20 border border-slate-600/30 opacity-50'
                      }`}
                    >
                      {isNew && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          NEW!
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm">{info.name}</div>
                          <div className="text-xs text-slate-400">{info.desc}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-green-400">+{upgrade.power * clickMultiplier} per click</span>
                            <span className="text-xs font-bold">{upgrade.cost.toLocaleString()}</span>
                          </div>
                          {upgrade.level > 0 && <div className="text-xs text-slate-500">Rank: {upgrade.level}</div>}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {activeTab === 'story' && getAvailableStoryChapters().map(([key, upgrade]) => {
                  const info = upgradeInfo[key];
                  const Icon = upgrade.icon || defaultStoryUpgrades[key]?.icon || Heart;
                  const canAfford = quota >= upgrade.quotaCost && corvcoin >= upgrade.corvcoinCost;
                  const isPurchased = upgrade.purchased;
                  const isNextChapter = !isPurchased && upgrade.order === getNextStoryChapter();
                  
                  if (isPurchased) {
                    return (
                      <button
                        key={key}
                        onClick={() => setStoryOverlay(key)}
                        className="w-full text-left rounded-lg p-3 text-sm bg-pink-600/20 border-2 border-pink-500/50 hover:bg-pink-600/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm">{info.name}</div>
                            <div className="text-xs text-slate-400">{info.desc}</div>
                            <div className="text-xs text-green-400 mt-1">✓ Purchased • +{upgrade.qps * qpsMultiplier}/s • Click to re-read</div>
                          </div>
                        </div>
                      </button>
                    );
                  }
                  
                  if (isNextChapter) {
                    return (
                      <button
                        key={key}
                        onClick={() => buyStoryUpgrade(key)}
                        disabled={!canAfford}
                        className={`w-full text-left rounded-lg p-3 text-sm transition-all relative ${
                          canAfford ? 'bg-pink-600/20 hover:bg-pink-600/30 border-2 border-pink-500/50' : 'bg-slate-700/20 border border-slate-600/30 opacity-50'
                        }`}
                      >
                        {canAfford && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                            NEW!
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-50" />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm">Purchase next chapter</div>
                            <div className="text-xs text-slate-500">Continue your journey...</div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-pink-400">+???/s</span>
                              <div className="text-xs font-bold">
                                <span>{upgrade.quotaCost.toLocaleString()} Q</span>
                                <span className="text-pink-300"> + </span>
                                <span>{upgrade.corvcoinCost} CC</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  }
                  
                  // Hidden chapter - show as "Purchase next chapter"
                  return (
                    <button
                      key={key}
                      disabled
                      className="w-full rounded-lg p-3 text-sm bg-slate-800/50 border border-slate-700/50 opacity-60 cursor-not-allowed"
                    >
                      <div className="flex items-start gap-2">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-30" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-slate-500">Purchase next chapter</div>
                          <div className="text-xs text-slate-600">Continue your journey to unlock...</div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {activeTab === 'premium' && (() => {
                  // Separate repeatable and oneTime upgrades
                  const repeatable = Object.entries(corvUpgrades).filter(([key, upgrade]) => upgrade.type === 'repeatable');
                  const oneTime = Object.entries(corvUpgrades).filter(([key, upgrade]) => upgrade.type === 'oneTime');
                  
                  return [...repeatable, ...oneTime].map(([key, upgrade]) => {
                  const info = upgradeInfo[key];
                  const Icon = upgrade.icon || defaultCorvUpgrades[key]?.icon || Sparkles;
                  const canAfford = corvcoin >= upgrade.cost;
                  const isNew = ((upgrade.type === 'oneTime' && !upgrade.purchased) || (upgrade.type === 'repeatable' && upgrade.level === 0)) && canAfford;
                  const isPurchased = upgrade.type === 'oneTime' && upgrade.purchased;
                  
                  if (isPurchased) {
                    return (
                      <div key={key} className="w-full rounded-lg p-2 bg-slate-700/30 border border-slate-600/30 text-xs text-slate-500 text-center">
                        ✓ {info.name} (Owned)
                      </div>
                    );
                  }
                  
                  return (
                    <button
                      key={key}
                      onClick={() => buyCorvUpgrade(key)}
                      disabled={!canAfford}
                      className={`w-full text-left rounded-lg p-3 text-sm transition-all relative ${
                        canAfford ? 'bg-purple-600/20 hover:bg-purple-600/30 border-2 border-purple-500/50' : 'bg-slate-700/20 border border-slate-600/30 opacity-50'
                      }`}
                    >
                      {isNew && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          NEW!
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm">{info.name}</div>
                          <div className="text-xs text-purple-300">{info.desc}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-purple-400">{upgrade.type === 'oneTime' ? 'ONE TIME' : `+${upgrade.bonus}%`}</span>
                            <span className="text-xs font-bold">{upgrade.cost} CC</span>
                          </div>
                          {upgrade.type === 'repeatable' && upgrade.level > 0 && <div className="text-xs text-slate-500">Rank: {upgrade.level}</div>}
                        </div>
                      </div>
                    </button>
                  );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-800/80 backdrop-blur rounded-b-2xl p-2 border-t border-blue-500/30 text-center text-xs text-slate-400 relative">
          Click to dominate • Menu for upgrades
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute bottom-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
          {showSettings && (
            <div className="absolute bottom-12 right-2 bg-slate-800 border-2 border-blue-500/50 rounded-lg p-3 shadow-2xl min-w-[200px]">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition-all"
              >
                Reset Progress
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rank Up Notification */}
      {rankUpNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl border-2 border-yellow-400/50 min-w-[280px]">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-400/20 rounded-full p-2">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-yellow-300/80 font-semibold uppercase tracking-wide">Rank Up!</div>
                <div className="text-lg font-bold text-white">{rankUpNotification}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Overlay */}
      {storyOverlay && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
          onClick={() => setStoryOverlay(null)}
        >
          <div 
            className="bg-slate-900 border-2 border-pink-500/50 rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl cursor-pointer"
            onClick={() => setStoryOverlay(null)}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {upgradeInfo[storyOverlay]?.name}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="text-lg text-slate-300 leading-relaxed mb-8 whitespace-pre-line">
              {storyTexts[storyOverlay]}
            </div>
            <div className="text-center text-sm text-slate-500 animate-pulse">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}

      {/* Win Screen */}
      {showWinScreen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-hidden"
          onClick={() => setShowWinScreen(false)}
        >
          <div 
            className="bg-gradient-to-br from-yellow-600/95 via-orange-600/95 to-red-600/95 backdrop-blur-md border-4 border-yellow-400 rounded-3xl p-12 max-w-3xl shadow-2xl cursor-pointer animate-pulse"
            onClick={() => setShowWinScreen(false)}
          >
            <div className="text-center mb-8">
              <Crown className="w-24 h-24 mx-auto mb-6 text-yellow-300 animate-bounce" />
              <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                YOU WON!
              </h1>
              <h2 className="text-3xl font-bold text-white mb-4">
                🎉 CONGRATULATIONS! 🎉
              </h2>
              <div className="w-48 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mb-6"></div>
              <p className="text-2xl text-yellow-100 font-bold mb-4">
                You've completed the story!
              </p>
              <p className="text-xl text-yellow-200 mb-6">
                You chose Ricky Berwick over Corvezeo.
              </p>
              <p className="text-lg text-yellow-100 italic">
                The guilt will haunt you forever.
              </p>
              <p className="text-lg text-yellow-100 italic mt-4">
                But hey, at least you won the game! 🏆
              </p>
            </div>
            <div className="text-center text-yellow-200 animate-pulse text-lg font-semibold">
              Click anywhere to continue clicking
            </div>
          </div>
        </div>
      )}

      {/* Reset Progress Confirmation */}
      {showResetConfirm && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
          onClick={() => setShowResetConfirm(false)}
        >
          <div 
            className="bg-slate-900 border-2 border-red-500/50 rounded-2xl p-8 max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Are You Sure?
            </h2>
            <p className="text-slate-300 mb-6 text-center">
              This will permanently delete all your progress. This cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Reset all state to defaults
                  localStorage.removeItem('quotaClickerSave');
                  window.location.reload();
                }}
                className="flex-1 py-3 px-6 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  setShowSettings(false);
                }}
                className="flex-1 py-3 px-6 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}