// src/utils/ProgramGenerator.js

export const generateWeeklyPlan = (answers, currentWeek = 1) => {
  
  // ============================================================
  // 1. ADIM: KULLANICI SEVİYESİ ANALİZİ (GİRDİ İŞLEME)
  // ============================================================
  let experience = "Orta Seviye"; // Varsayılan
  if (answers && Array.isArray(answers)) {
      const allAnswers = answers.join(" ");
      // Kullanıcının cevaplarında anahtar kelime arıyoruz
      if (allAnswers.includes("Yeni")) experience = "Yeni Başlayan";
      else if (allAnswers.includes("İleri") || allAnswers.includes("Advanced")) experience = "İleri Seviye";
  }

  // ============================================================
  // 2. ADIM: HAFTALIK GÜN SAYISI (REGEX İLE AYIKLAMA)
  // ============================================================
  let daysPerWeek = 3; 
  
  if (answers && Array.isArray(answers)) {
      answers.forEach(ans => {
          // İçinde "gün" veya "Day" geçen cevaptaki rakamı al (Örn: "Haftada 4 gün")
          if (typeof ans === 'string' && (ans.includes("gün") || ans.includes("Day"))) {
              const match = ans.match(/[1-7]/); 
              if (match) {
                  daysPerWeek = parseInt(match[0]);
              }
          }
      });
  }
  // Hata koruması: Gün sayısı mantıksızsa 3'e sabitle
  if (daysPerWeek > 7 || daysPerWeek < 1) daysPerWeek = 3;


  // ============================================================
  // 3. ADIM: HAREKET SEÇİMİ (Exercise Selection Logic)
  // Mantık: Hareket türü her 8 HAFTADA BİR değişir (Level Up)
  // ============================================================
  
  // Başlangıç seviyesini belirle
  let baseLevel = 0; // Yeni Başlayan (Index 0: Squat vb.)
  if (experience === "Orta Seviye") baseLevel = 1; // (Index 1: Side Lunge vb.)
  if (experience === "İleri Seviye") baseLevel = 2; // (Index 2: Reverse Lunge vb.)

  // Matematik: Her 8 haftada bir seviye atla
  // Hafta 1-8: +0 | Hafta 9-16: +1 | Hafta 17-24: +2
  let difficultyIndex = baseLevel + Math.floor((currentWeek - 1) / 8);
  
  // Güvenlik Kilidi: Maksimum index 3'tür (Daha fazla video/hareket yok)
  if (difficultyIndex > 3) difficultyIndex = 3;


  // ============================================================
  // 4. ADIM: YOĞUNLUK VE HACİM AYARI (Intensity Logic)
  // Mantık: 8 Haftalık blok içinde her 2 haftada bir zorluk artar.
  // ============================================================
  
  // Modulo 8 ile haftayı 0-7 arasına sıkıştırıyoruz, sonra 2'ye bölüyoruz.
  // Sonuçlar: 0 (Hafta 1-2), 1 (Hafta 3-4), 2 (Hafta 5-6), 3 (Hafta 7-8)
  let intensityPhase = Math.floor(((currentWeek - 1) % 8) / 2);
  
  let sets = 3; 
  let reps = "10-12"; 
  let rest = 60;
  let focusTitle = "";

  switch (intensityPhase) {
      case 0: // Hafta 1-2 (Adaptasyon)
          sets = 3; 
          reps = "10-12"; 
          rest = 60; // Standart dinlenme
          focusTitle = "Teknik & Adaptasyon";
          break;
      case 1: // Hafta 3-4 (Hacim Artışı)
          sets = 3; 
          reps = "12-15"; // Tekrar arttı
          rest = 50; // Dinlenme azaldı
          focusTitle = "Hacim Artışı (Volume)";
          break;
      case 2: // Hafta 5-6 (Yoğunluk Artışı)
          sets = 4; // Set sayısı arttı
          reps = "10-12"; 
          rest = 45; // Dinlenme iyice azaldı
          focusTitle = "Yoğunluk (Intensity)";
          break;
      case 3: // Hafta 7-8 (Zirve Performans)
          sets = 4; 
          reps = "Tükenene Kadar"; // Limit yok
          rest = 30; // Nabız hiç düşmeyecek
          focusTitle = "Maksimum Performans (Peak)";
          break;
      default:
          sets = 3; reps = "10-12"; rest = 60;
  }

  // Başlığa Blok Bilgisini Ekle (Örn: Blok 1, Blok 2...)
  const blockNumber = Math.floor((currentWeek - 1) / 8) + 1;
  focusTitle = `${focusTitle} - Blok ${blockNumber}`;


  // ============================================================
  // 5. ADIM: HAREKET HAVUZU (DATABASE)
  // Index 0: Kolay -> Index 3: Çok Zor
  // ============================================================
  const exercisePool = {
      legs: [
          { id: 'squat', name: 'SQUAT' }, 
          { id: 'sideLunge', name: 'SIDE LUNGE' }, 
          { id: 'reverseLunge', name: 'REVERSE LUNGE' }, 
          { id: 'jumpSquat', name: 'JUMP SQUAT' }
      ],
      push: [
          { id: 'kneePushUp', name: 'KNEE PUSH-UP' }, 
          { id: 'pushUp', name: 'PUSH-UP' }, 
          { id: 'shoulderTap', name: 'SHOULDER TAP' }, 
          { id: 'diamondPushUp', name: 'DIAMOND PUSH-UP'}
      ],
      abs: [
          { id: 'crunch', name: 'CRUNCH' }, 
          { id: 'SeatedKneeTuck', name: 'SEATED KNEE TUCK' }, 
          { id: 'bicycleCrunch', name: 'BICYCLE CRUNCH'}, 
          { id: 'jackknife', name: 'JACKKNIFE' }
      ],
      stability: [
          { id: 'plank', name: 'PLANK' }, 
          { id: 'sidePlank', name: 'SIDE PLANK' }, 
          { id: 'sidePlankAbduction', name: 'SIDE PLANK ABDUCTION'}, 
          { id: 'diagonalPlank', name: 'DIAGONAL PLANK'}
      ],
      back: [
          { id: 'birdDog', name: 'BIRD DOG' }, 
          { id: 'cobraStretch', name: 'COBRA STRETCH' }, 
          { id: 'superman', name: 'SUPERMAN' }, 
          { id: 'swimmers', name: 'SWIMMERS' }
      ],
      cardio: [
          { id: 'highKnees', name: 'HIGH KNEES' }, 
          { id: 'jumpingJacks', name: 'JUMPING JACKS' }, 
          { id: 'mountainClimber', name: 'MOUNTAIN CLIMBER' }, 
          { id: 'burpee', name: 'BURPEE' }
      ]
  };

  // ============================================================
  // 6. ADIM: GÜNLÜK PLAN OLUŞTURMA VE DÖNDÜRME
  // ============================================================
  const schedule = [];
  
  for (let i = 1; i <= daysPerWeek; i++) {
      let dailyMoves = [];

      // Split Antrenman Mantığı (Tek Günler: Kuvvet, Çift Günler: Kondisyon)
      if (i % 2 !== 0) { 
          // TEK GÜNLER
          // NOT: difficultyIndex yukarıda hesaplandı (8 haftada bir değişir)
          dailyMoves.push(exercisePool.legs[difficultyIndex] || exercisePool.legs[0]);
          dailyMoves.push(exercisePool.push[difficultyIndex] || exercisePool.push[0]);
          dailyMoves.push(exercisePool.abs[difficultyIndex] || exercisePool.abs[0]);
          dailyMoves.push(exercisePool.back[difficultyIndex] || exercisePool.back[0]); 
      } else {
          // ÇİFT GÜNLER
          dailyMoves.push(exercisePool.cardio[difficultyIndex] || exercisePool.cardio[0]);
          dailyMoves.push(exercisePool.stability[difficultyIndex] || exercisePool.stability[0]);
          dailyMoves.push(exercisePool.back[difficultyIndex] || exercisePool.back[0]);
          dailyMoves.push(exercisePool.abs[difficultyIndex] || exercisePool.abs[0]);
      }

      // Hata önleme (Boş hareket varsa temizle)
      dailyMoves = dailyMoves.filter(m => m !== undefined);

      // JSON formatında günü oluştur
      schedule.push({
          day: `${i}. Gün`, 
          focus: i % 2 !== 0 ? `${focusTitle} (Kuvvet)` : `${focusTitle} (Kondisyon)`,
          exercises: dailyMoves.map(ex => ({
              ...ex,
              sets: sets, // Hesaplanan set sayısı
              reps: reps, // Hesaplanan tekrar sayısı
              rest: `${rest} sn`, // Hesaplanan dinlenme
              isCompleted: false
          }))
      });
  }

  return schedule;
};