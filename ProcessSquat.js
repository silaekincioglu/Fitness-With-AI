import { calculateAngle } from '../utils/poseUtils';

export const processSquat = (
  landmarks, 
  stageRef, 
  counterRef, 
  setCount, 
  updateFeedback, 
  setImmediateFeedback, 
  activeSideColor, 
  shoulder, 
  hip, 
  knee, 
  ankle, 
  feedbackRef
) => {
    // 1. AÇI HESAPLAMALARI
    const kneeAngle = calculateAngle(hip, knee, ankle);
    const hipAngle = calculateAngle(shoulder, hip, knee);

    // Ekranda çizilecek noktalar
    const activePoints = [shoulder, hip, knee, ankle];
    let strokeColor = "#00FFFF"; // Standart (Mavi)

    // 2. FORM KONTROLÜ (GÜVENLİK)
    // Sırt çok öne eğilirse uyar (55 derece limiti)
    if (hipAngle < 55) {
        updateFeedback("Gövdeni dik tut!");
        strokeColor = "#FF0000"; // Hata (Kırmızı)
    }

    // 3. HAREKET MANTIĞI
    
    // İNİŞ AŞAMASI (Daha Derin - Deep Squat)
    // 90 Derece: Üst bacağın yere paralel olduğu veya biraz daha altına indiği an.
    if (kneeAngle < 90) { 
        if (hipAngle > 55) {
            stageRef.current = "down"; // Artık "Aşağıda" olarak işaretlendi
            updateFeedback("Şimdi patlayıcı güçle kalk! 🚀");
            strokeColor = "#FFFF00"; // Hazırlık (Sarı)
        }
    } 
    // Kullanıcı iniyor ama yeterince derin değilse (85-110 arası) uyar
    else if (kneeAngle < 110 && stageRef.current !== "down") {
        updateFeedback("Daha aşağı in!");
    }

    // KALKIŞ AŞAMASI (Tamamlama)
    // 165 Derece: Bacakların neredeyse dümdüz olduğu an.
    // +1 SADECE BURADA OLUR
    if (kneeAngle > 165 && stageRef.current === "down") {
        setCount(prev => prev + 1); // Sayacı artır
        stageRef.current = "up";   // Durumu sıfırla (Bir sonraki tekrar için)
        setImmediateFeedback("MÜKEMMEL DERİNLİK! 🔥");
        strokeColor = "#00FF00"; // Başarı (Yeşil)
    }

    return { strokeColor, activePoints };
};