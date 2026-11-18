/* SATU sumber data status gunung api. Diisi dari data yang kamu verifikasi (MAGMA Indonesia/PVMBG & BNPB, 13-14 Nov 2026).
   MAGMA tidak bisa dibaca otomatis (robots.txt), jadi 6 gunung Waspada diberi perluVerifikasi:true.
   Gunung yang tidak tercantum di sini otomatis "Belum diverifikasi" (level 0). Level: 1 Normal, 2 Waspada, 3 Siaga, 4 Awas. */
const statusGunungApi={
 tanggalData:'2026-11-14',
 sumberUrl:'https://magma.esdm.go.id/v1',
 catatan:'Status bersifat dinamis dan dapat berubah sewaktu-waktu. Cek resmi di',
 items:[
  {id:'krakatau',nama:'Anak Krakatau',level:3,label:'Siaga',radiusBahayaKm:5,sejakTanggal:'2026-10-10',rekomendasi:'Jalur pendakian ditutup. Jauhi radius 5 km dari kawah. Potensi bahaya (BNPB): aliran lava, lontaran batu pijar, hujan abu lebat, dan erupsi sekunder.',sumber:'https://magma.esdm.go.id/v1',tanggalUpdate:'2026-11-14',perluVerifikasi:false},
  {id:'merapi',nama:'Merapi',level:3,label:'Siaga',radiusBahayaKm:3,sejakTanggal:'2020-11-05',rekomendasi:'Jalur pendakian ditutup. Jauhi radius 3 km dari puncak dan ikuti arahan BPPTKG/BPBD.',sumber:'https://magma.esdm.go.id/v1',tanggalUpdate:'2026-11-14',perluVerifikasi:false},
  {id:'semeru',nama:'Semeru',level:3,label:'Siaga',radiusBahayaKm:5,sejakTanggal:'2025-11-29',rekomendasi:'Sebelumnya Awas, diturunkan ke Siaga pada 29 November 2025. Jalur pendakian ditutup. Jauhi radius 5 km dari kawah.',sumber:'https://magma.esdm.go.id/v1',tanggalUpdate:'2026-11-14',perluVerifikasi:false}
 ].concat(['lewotolo:Ili Lewotolok','ibu:Ibu','dukono:Dukono','marapi:Marapi','dempo:Dempo','karangetang:Karangetang'].map(s=>{const a=s.split(':');return {id:a[0],nama:a[1],level:2,label:'Waspada',radiusBahayaKm:null,sejakTanggal:null,rekomendasi:'Patuhi batas radius aman dan hindari area sekitar kawah. Ikuti rekomendasi PVMBG.',sumber:'https://magma.esdm.go.id/v1',tanggalUpdate:'2026-11-14',perluVerifikasi:true}}))
};
