// src/utils/AudioHandler.js

// NOT: Bu dosyaların çalışması için 'assets' klasörünü 'src' içine taşıman gerek!
// Yeni yol: src/assets/sounds/...

import startSoundFile from '../assets/sounds/countdown_start.mp3';
import postureUprightFile from '../assets/sounds/posture_upright.mp3';
import hipsDownFile from '../assets/sounds/hips_down.mp3';
import hipsUpFile from '../assets/sounds/hips_up.mp3';
import stabilizeBodyFile from '../assets/sounds/stabilize_body.mp3';
import legsStraightFile from '../assets/sounds/legs_straight.mp3';
import fixArmsFile from '../assets/sounds/fix_arms.mp3';
import goLowerFile from '../assets/sounds/go_lower.mp3';
import pushHigherFile from '../assets/sounds/push_higher.mp3';
import dontTouchFloorFile from '../assets/sounds/dont_touch_floor.mp3';

// Sesleri tarayıcı hafızasına alalım
const sounds = {
    start: new Audio(startSoundFile),
    postureUpright: new Audio(postureUprightFile),
    hipsDown: new Audio(hipsDownFile),
    hipsUp: new Audio(hipsUpFile),
    stabilizeBody: new Audio(stabilizeBodyFile),
    legsStraight: new Audio(legsStraightFile),
    fixArms: new Audio(fixArmsFile),
    goLower: new Audio(goLowerFile),
    pushHigher: new Audio(pushHigherFile),
    dontTouchFloor: new Audio(dontTouchFloorFile),
};

// Yardımcı oynatma fonksiyonu
const playSound = (audioObj) => {
    if (audioObj) {
        audioObj.currentTime = 0; // Sesi başa sar
        audioObj.play().catch((error) => {
            console.warn("Ses oynatılamadı (Tarayıcı kısıtlaması olabilir):", error);
        });
    }
};

export const playStartSound = () => {
    playSound(sounds.start);
};

export const playFeedbackSound = (message) => {
    // Gelen mesaja göre uygun sesi çal
    if (!message) return;
    
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("dik dur") || lowerMsg.includes("postür")) {
        playSound(sounds.postureUpright);
    } else if (lowerMsg.includes("kalçanı indir") || lowerMsg.includes("kalça çok yukarıda")) {
        playSound(sounds.hipsDown);
    } else if (lowerMsg.includes("kalçanı kaldır") || lowerMsg.includes("belin çukur")) {
        playSound(sounds.hipsUp);
    } else if (lowerMsg.includes("sabit dur") || lowerMsg.includes("sallanma")) {
        playSound(sounds.stabilizeBody);
    } else if (lowerMsg.includes("bacaklar düz") || lowerMsg.includes("dizlerini kırma")) {
        playSound(sounds.legsStraight);
    } else if (lowerMsg.includes("kollarını düzelt") || lowerMsg.includes("dirsek")) {
        playSound(sounds.fixArms);
    } else if (lowerMsg.includes("daha aşağı") || lowerMsg.includes("tam in")) {
        playSound(sounds.goLower);
    } else if (lowerMsg.includes("daha yukarı") || lowerMsg.includes("tam kalk")) {
        playSound(sounds.pushHigher);
    } else if (lowerMsg.includes("yere değme") || lowerMsg.includes("dizlerin yerde")) {
        playSound(sounds.dontTouchFloor);
    }
};