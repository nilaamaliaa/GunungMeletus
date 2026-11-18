/* Data grafik "gunung yang erupsi per tahun".
   SUMBER: Smithsonian Global Volcanism Program (GVP) – daftar kronologis erupsi Holosen gunung api Indonesia
   https://volcano.si.edu/volcanolist_countries.cfm?country=Indonesia  (data lengkap sampai akhir 2023).
   Format tiap baris: [nama gunung, tahun mulai, tahun selesai]. Hanya erupsi berstatus "Confirmed" (yang "Uncertain" tidak dihitung).
   Erupsi yang berlanjut (continuing) dicatat sampai 2023. Sebuah gunung dihitung "erupsi" pada tahun T bila ada erupsi
   yang aktif pada sebagian waktu tahun T (definisi yang sama dengan tabel "What was erupting in the year…?" milik GVP).
   Baris sebelum 2000 hanya dimasukkan bila erupsinya berlanjut sampai tahun 2000 atau sesudahnya. */
const letusanTahunan={
 dari:2000,sampaiLengkap:2023,
 sumberUrl:'https://volcano.si.edu/volcanolist_countries.cfm?country=Indonesia',
 rec:[
  ['Semeru',1967,2009],['Dukono',1933,2023],['Merapi',1992,2002],['Karangetang',1999,2003],['Batur',1999,2000],
  ['Peuet Sague',2000,2000],['Tengger Caldera',2000,2001],['Kaba',2000,2000],['Raung',2000,2000],['Krakatau',2000,2000],['Soputan',2000,2003],['Lokon-Empung',2000,2001],['Marapi',2000,2000],
  ['Talang',2001,2001],['Krakatau',2001,2001],['Ibu',2001,2001],['Kerinci',2001,2002],['Marapi',2001,2001],['Inielika',2001,2001],
  ['Lokon-Empung',2002,2002],['Raung',2002,2002],['Lewotobi',2002,2002],['Ruang',2002,2002],['Papandayan',2002,2002],['Lokon-Empung',2002,2003],
  ['Lewotobi',2003,2003],['Leroboleng',2003,2003],['Dieng',2003,2003],['Gamalama',2003,2003],['Lokon-Empung',2003,2003],
  ['Egon',2004,2004],['Karangetang',2004,2005],['Ibu',2004,2005],['Awu',2004,2004],['Tengger Caldera',2004,2004],['Kerinci',2004,2004],['Marapi',2004,2004],['Rinjani',2004,2004],['Soputan',2004,2004],
  ['Egon',2005,2005],['Talang',2005,2005],['Soputan',2005,2005],['Soputan',2005,2006],['Ambang',2005,2005],
  ['Merapi',2006,2007],['Karangetang',2006,2007],['Talang',2006,2006],['Dempo',2006,2006],['Soputan',2006,2006],
  ['Batu Tara',2007,2015],['Talang',2007,2007],['Soputan',2007,2007],['Gamkonora',2007,2007],['Raung',2007,2007],['Kerinci',2007,2007],['Kelud',2007,2008],['Krakatau',2007,2008],
  ['Karangetang',2008,2010],['Kerinci',2008,2008],['Ibu',2008,2023],['Egon',2008,2008],['Soputan',2008,2008],['Raung',2008,2008],
  ['Dempo',2009,2009],['Dieng',2009,2009],['Krakatau',2009,2009],['Kerinci',2009,2009],['Slamet',2009,2009],['Rinjani',2009,2010],
  ['Semeru',2010,2010],['Sinabung',2010,2010],['Krakatau',2010,2012],['Merapi',2010,2010],['Tengger Caldera',2010,2011],
  ['Lokon-Empung',2011,2011],['Karangetang',2011,2011],['Merapi',2011,2011],['Semeru',2011,2012],['Lokon-Empung',2011,2012],['Soputan',2011,2011],['Marapi',2011,2011],['Gamalama',2011,2011],['Kerinci',2011,2011],
  ['Lewotolok',2012,2012],['Marapi',2012,2012],['Sirung',2012,2012],['Karangetang',2012,2013],['Soputan',2012,2012],['Gamalama',2012,2012],['Lokon-Empung',2012,2013],['Paluweh',2012,2013],['Raung',2012,2013],
  ['Tangkuban Parahu',2013,2013],['Krakatau',2013,2013],['Kerinci',2013,2013],['Raung',2013,2013],['Merapi',2013,2013],['Iliwerung',2013,2013],['Sinabung',2013,2018],['Semeru',2013,2013],
  ['Raung',2014,2015],['Marapi',2014,2014],['Karangetang',2014,2014],['Karangetang',2014,2016],['Kelud',2014,2014],['Slamet',2014,2014],['Merapi',2014,2014],['Krakatau',2014,2014],['Semeru',2014,2017],['Sangeang Api',2014,2015],['Gamalama',2014,2014],
  ['Soputan',2015,2015],['Lokon-Empung',2015,2015],['Sirung',2015,2015],['Gamalama',2015,2015],['Rinjani',2015,2015],['Tengger Caldera',2015,2016],['Marapi',2015,2015],
  ['Soputan',2016,2016],['Kerinci',2016,2016],['Rinjani',2016,2016],['Gamalama',2016,2016],
  ['Krakatau',2017,2017],['Dieng',2017,2017],['Marapi',2017,2017],['Semeru',2017,2023],['Sangeang Api',2017,2020],['Kerinci',2017,2017],['Dempo',2017,2017],['Agung',2017,2019],
  ['Karangetang',2018,2018],['Dieng',2018,2018],['Kerinci',2018,2021],['Marapi',2018,2018],['Merapi',2018,2020],['Krakatau',2018,2020],['Soputan',2018,2018],['Gamalama',2018,2018],['Karangetang',2018,2023],
  ['Sinabung',2019,2019],['Tengger Caldera',2019,2019],['Tangkuban Parahu',2019,2019],
  ['Soputan',2020,2020],['Raung',2020,2020],['Sinabung',2020,2021],['Lewotolok',2020,2023],['Tengger Caldera',2020,2020],['Merapi',2020,2023],
  ['Raung',2021,2021],['Dieng',2021,2021],['Krakatau',2021,2023],['Sirung',2021,2021],['Iliwerung',2021,2021],
  ['Sangeang Api',2022,2022],['Raung',2022,2022],['Dempo',2022,2022],['Kerinci',2022,2023],
  ['Marapi',2023,2023],['Dempo',2023,2023],['Tengger Caldera',2023,2023],['Lewotobi',2023,2023]
 ],
 /* 2024–2026: BELUM lengkap. Hanya gunung yang tampil berstatus erupsi berlanjut di daftar "Current Eruptions"
    dan Weekly Volcanic Activity Report GVP yang sempat dibaca. Anggap sebagai angka MINIMUM, bukan total. */
 sementara:{
  2024:['Dukono','Ibu','Karangetang','Lewotobi','Lewotolok','Marapi','Merapi','Semeru'],
  2025:['Dukono','Ibu','Lewotobi','Lewotolok','Marapi','Merapi','Raung','Semeru'],
  2026:['Ibu','Karangetang','Lewotobi','Lewotolok','Marapi','Merapi','Semeru','Tengger Caldera']
 }
};
