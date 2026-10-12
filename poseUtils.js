
// Açı Hesaplama Fonksiyonu
export function calculateAngle(a, b, c) {
  if (!a || !b || !c) return 0;
  
  // Vektörler (BA ve BC)
  const ab = [b.x - a.x, b.y - a.y, b.z - a.z];
  const cb = [b.x - c.x, b.y - c.y, b.z - c.z];
  
  // Dot Product
  const dotProduct = ab[0] * cb[0] + ab[1] * cb[1] + ab[2] * cb[2];
  
  // Büyüklükler
  const magAB = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
  const magCB = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2]);
  
  // Kosinüs hesapla ve aralığı sınırla
  const cosTheta = dotProduct / (magAB * magCB);
  const clampedCosTheta = Math.max(-1.0, Math.min(1.0, cosTheta));
  
  // Radyandan dereceye çevir
  return (Math.acos(clampedCosTheta) * 180.0) / Math.PI;
}

// Sırt Eğimi Hesaplama Fonksiyonu
export function calculateBackSlope(shoulder, hip) {
  if (!shoulder || !hip) return 0;
  const dy = hip.y - shoulder.y; 
  const dx = Math.abs(hip.x - shoulder.x);
  const angleRad = Math.atan2(dy, dx);
  let angleDeg = (angleRad * 180.0) / Math.PI;
  if (angleDeg < 0) angleDeg = 0;
  return angleDeg;
}
