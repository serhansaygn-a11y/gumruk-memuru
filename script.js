// NOT DEFTERİ FONKSİYONLARI
function toggleNotes() {
    const sidebar = document.getElementById('notesSidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

const noteInput = document.getElementById('noteInput');
const saveStatus = document.getElementById('saveStatus');

// Sayfa yüklendiğinde notları yükle (gumrukNotes)
window.addEventListener('load', () => {
    const savedNotes = localStorage.getItem('gumrukNotes');
    if (savedNotes) {
        if (noteInput) noteInput.value = savedNotes;
    }
});

// Otomatik kaydetme (gumrukNotes)
if (noteInput) {
    noteInput.addEventListener('input', () => {
        localStorage.setItem('gumrukNotes', noteInput.value);
        if (saveStatus) {
            saveStatus.innerText = "Kaydedildi...";
            setTimeout(() => {
                saveStatus.innerText = "Otomatik kaydediliyor...";
            }, 2000);
        }
    });
}
// NOT DEFTERİ BİTİŞ

// YARDIMCI FONKSİYON: İSTATİSTİK SEKMESİ İÇİN ALT TAB GEÇİŞİ
function loadSubTab(tabName) {
    // Sadece #istatistikler içindeki sub-tab-content ve sub-tab-buttonları etkiler
    document.querySelectorAll('#istatistikler .sub-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('#istatistikler .sub-tab-button').forEach(b => b.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`#istatistikler button[onclick="loadSubTab('${tabName}')"]`).classList.add('active');
}

// ANA TAB GEÇİŞİ
function loadPage(pageName) {
    document.querySelectorAll('.tabs .tab-button').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.tab === pageName) b.classList.add('active');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(pageName).classList.add('active');

    if (pageName === 'transit') {
        document.querySelectorAll('#transit .sub-tab-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === 'platform') btn.classList.add('active');
        });
        document.querySelectorAll('#transit .sub-tab-content').forEach(c => {
            c.classList.remove('active');
            if (c.id === 'platform') c.classList.add('active');
        });
    }
    // İSTATİSTİKLER sekmesi açıldığında ilk alt menüyü aktifleştir
    if (pageName === 'istatistikler') {
        loadSubTab('uluslararasi_ticaret');
    }
}

document.querySelectorAll('.tabs .tab-button').forEach(btn => {
    btn.addEventListener('click', () => loadPage(btn.dataset.tab));
});

// TRANSİT ALT TAB GEÇİŞİ
document.querySelectorAll('#transit .sub-tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#transit .sub-tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('#transit .sub-tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// ŞEHİTLER FOTOĞRAFI
const martyrPhotos = {
    yarmoglu: 'https://raw.githubusercontent.com/serhansaygn-a11y/gumruk-memuru/refs/heads/main/yar%C4%B1mo%C4%9Flu.png',
    turan: 'https://raw.githubusercontent.com/serhansaygn-a11y/gumruk-memuru/refs/heads/main/turan.png',
    kavastan: 'https://raw.githubusercontent.com/serhansaygn-a11y/gumruk-memuru/refs/heads/main/kavastan.png',
    turk: 'https://raw.githubusercontent.com/serhansaygn-a11y/gumruk-memuru/refs/heads/main/t%C3%BCrk.png',
    sakaoglu: 'https://raw.githubusercontent.com/serhansaygn-a11y/gumruk-memuru/refs/heads/main/sakaro%C4%9Flu.png'
};

document.querySelectorAll('.martyr-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const key = link.dataset.martyr;
        const container = document.getElementById('martyr-photo-container');
        container.innerHTML = `<img src="${martyrPhotos[key]}" alt="${link.textContent}" class="martyr-photo" onclick="showModal(this.src)">`;
    });
});

// STATÜ ARAMA (Transit)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#transitList li').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
}

// TAŞIT YOLCU ARAMA
const tasitSearch = document.getElementById('tasitSearch');
if (tasitSearch) {
    tasitSearch.addEventListener('keyup', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#tasit_yolcu .link-card-vertical').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
}

// ULAŞTIRMA - Sorgulamalar Arama
const sorguSearch = document.getElementById('sorguSearch');
if (sorguSearch) {
    sorguSearch.addEventListener('keyup', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#sorgulamalar .link-card-vertical').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
}

// ULAŞTIRMA - Cezalar Arama
const cezaSearch = document.getElementById('cezaSearch');
if (cezaSearch) {
    cezaSearch.addEventListener('keyup', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#cezaTable tbody tr').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

// ULAŞTIRMA TAB GEÇİŞİ
function openTab(tabName) {
    document.querySelectorAll('#ulastirma .tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#ulastirma .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`#ulastirma button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// MENŞE KONTROL ARAMA FONKSİYONU
function performSearch() {
    const query = document.getElementById('menseSearchInput').value.toLowerCase();
    const items = document.querySelectorAll('#mense_kontrol .link-card');
    items.forEach(item => {
        // Hem başlık (h3) hem de açıklama (p) içeriğini al
        const text = item.querySelector('div').textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

// MODAL KAPATMA
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    // İçeriği temizle
    document.getElementById('modalInnerContent').innerHTML = '';
}

// MODAL - SADECE GÖRSEL GÖSTERME (Transit şemaları gibi yerler için)
function showModal(src) {
    const modal = document.getElementById('imageModal');
    const innerContent = document.getElementById('modalInnerContent');

    // Metin içeriğini temizle ve sadece resmi göster
    innerContent.innerHTML = `
      <img src="${src}" alt="Büyütülmüş Görsel" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    `;
    modal.style.display = 'block';
}

// GÜMRÜK BAYRAĞI DETAY MODALI
function showFlagDetail(event) {
    event.preventDefault(); // Sayfanın üste kaymasını engeller.

    const innerContent = document.getElementById('modalInnerContent');
    const modal = document.getElementById('imageModal');

    // İçeriği temizle
    innerContent.innerHTML = '';

    const title = "Gümrük Bayrağı Tarihçe ve Şekli";
    const content = `
      <h3 style="color: var(--accent); margin-bottom: 15px; text-align: center;">${title}</h3>
      <p style="text-align: left; margin-bottom: 20px;">
        Hukuki Dayanak ve Kurucu İradenin Tespiti: Gümrük idarelerinde kullanılan Gümrük İdaresi Bayrakları,
        28.07.1937 tarihli ve 2/7175 sayılı İcra Vekilleri Heyeti (Bakanlar Kurulu) Kararnamesi ile kabul edilen
        ve 14.09.1937 tarihli ve 3708 sayılı Resmî Gazete'de yayımlanan Türk Bayrağı Nizamnamesi'nin 36 ncı maddesinde
        belirtilen (2) numaralı Levha ile tespit edilmiştir. Bu Kararname, Türkiye Cumhuriyeti'nin kurucusu
        Mustafa Kemal ATATÜRK'ün (Reisicumhur) ve dönemin Başvekili İsmet İNÖNÜ'nün imzalarını taşımaktadır.
      </p>
      <p style="text-align: left; margin-bottom: 20px;">
        Bayrak Çeşitleri: Anılan Nizamnamenin eki (2) numaralı Levhada gümrük idareleri için iki adet özel bayrak bulunmaktadır:
        <br>
        1. **Gümrük Dairesi Bayrağı (Gümrük Teşkilatı Bayrağı):** Türk Bayrağının şekil ve ölçüleriyle aynı olup, ay ve yıldızı levhada belirtilen ölçülerde yeşil renkli dikdörtgen bir şerit çerçevelemektedir. Yeşil şeridin genişliği $1/25 G$ (Bayrak Genişliği) olup, yeşilin dış kenarlarının bayrağın dört dış kenarından açıklığı ise $1/-5 G$ olarak belirlenmiştir. Gümrük Müsteşarlığının (şimdiki T.C. Ticaret Bakanlığı) resmi web sitesinin sağ üst köşesinde kullanılan bayrak bu bayraktır.
        <br>
        2. **Gümrük Kontrolünü Simgeleyen Bayrak:** Yeşil zemin üzerinde, levhada belirtilen ölçülerde kırmızı ve beyaz dikdörtgen şeklindeki bayraktır.
      </p>
      <p style="text-align: left; margin-bottom: 20px;">
        Kullanım Süresi: Bu özel bayraklar, 1937 yılından bu yana bütün gümrük idarelerinde ve kara sınır kapılarında kullanılmaktadır.
      </p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Gumruk-Bayragi-Sinir-Kapisi-Bayragi-yonetmelik.jpg"
           alt="Gümrük Bayrağı Yönetmelik Görseli"
           style="max-width: 100%; height: auto; border-radius: 8px; cursor: pointer;"
           onclick="showModal('https://upload.wikimedia.org/wikipedia/commons/2/20/Gumruk-Bayragi-Sinir-Kapisi-Bayragi-yonetmelik.jpg')">
      <p style="font-size: 0.8em; color: var(--muted); margin-top: 10px;">
        Görseli büyütmek için üzerine tıklayın.
      </p>
    `;

    // İçeriği innerHTML ile tek seferde yerleştiriyoruz.
    innerContent.innerHTML = content;

    // Ana modal pencereyi göster
    modal.style.display = 'block';
}

// GÜMRÜK MEMURLARI DETAY MODALI (YENİ)
function showMemurDetail(event) {
    event.preventDefault(); // Sayfanın üste kaymasını engeller.

    const innerContent = document.getElementById('modalInnerContent');
    const modal = document.getElementById('imageModal');

    // İçeriği temizle
    innerContent.innerHTML = '';

    const title = "GÜMRÜK MEMURLARI TALEPLERİ";
    const content = `
      <h3 style="color: var(--accent); margin-bottom: 15px; text-align: center;">${title}</h3>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Gümrük Memuru Mesleki İtibar İstiyor:</h4>
      <p>Gümrük memurları; gümrük ve dış ticaret mevzuatının sahadaki doğrudan uygulayıcıları olup, dış ticaret işlemlerinin mevzuata uygun şekilde yürütülmesini, ülke ekonomisinin korunmasını, kamu gelirlerinin tahsilini ve kaçakçılıkla mücadelenin etkin biçimde yapılmasını sağlamaktadır. Bu kapsamda; Memur ve Veri Hazırlama ve Kontrol İşletmeni kadrolarında görev yapan personele teşkilatımız içinde “Gümrük Memuru” unvanı verilmesi, Gümrük hizmetlerinin uzmanlık gerektiren bir alan olduğu dikkate alınarak, diğer kamu kurum ve kuruluşlarından naklen atamalar veya açıktan alımlar yoluyla “Gümrük Memuru” unvanına atama yapılmasının önüne geçilmesi talep edilmektedir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Gümrük Memurlarına Mahrum Hak Talebi:</h4>
      <p>Gümrük Memuru unvanının ihdası halinde, Devlet Memurlarına Ödenecek Zam ve Tazminatlara İlişkin Karar’ın 1 sayılı cetvelinin 17. sırasında yer alan personelin dışına çıkılacağı için; mevcut olarak ödenen 750 puan İş Güçlüğü Zammı, 250 puana kadar Temininde Güçlük Zammı ile ilave 750 puana kadar Temininde Güçlük Zammı, 500 puana kadar İş Riski Zammı haklarından mahrum kalınabilecektir. Bu nedenle, Gümrük Müsteşarlığı bölümü kapsamında H cetveline eklenerek, Gümrük Memurlarına toplam **2.250 puan** ek ödeme yapılması talep edilmektedir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Kademe/Derece Düzenlemesi:</h4>
      <p>Gümrük Memurlarının kademe ve derecelerinin, mesleğin risk ve sorumluluk yapısı dikkate alınarak **1 ila 12** arasında düzenlenmesi talep edilmektedir. (Örnek: Sağlık Memuru, Ayniyat Saymanı vb.)</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Fazla Mesai ve Ek Ödemeler:</h4>
      <p>Gümrük memurları; 24 saat esasına dayalı vardiya sistemiyle, resmi ve dini bayramlar ile hafta sonu tatilleri olmaksızın görev yapmakta, yüksek iş yükü ve ağır sorumluluk altında hizmet vermektedir. Bu çerçevede, fazla mesai ücretlerinden gelir vergisi kesintisinin kaldırılması, görevin barındırdığı tehlikeler nedeniyle personele risk tazminatı ödenmesi, fiili hizmet süresi zammı kapsamında yıpranma payı hakkının tanınması ve devlet memurlarına ödenen zam ve tazminatlara ilave olarak gümrük memurlarına da ek hak sağlanması talep edilmektedir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Gümrük Uzlaşma Yönetmeliği:</h4>
      <p>Gümrük ve Dış Ticaret Bölge Müdürlükleri Uzlaşma Komisyonlarında, gümrük ve dış ticaret mevzuatını fiilen uygulayan ve komisyonun tüm sekreterya işlemlerini yürüten Gümrük Memurlarının unvanlarının da komisyon yapısına eklenmesi; bu doğrultuda ‘Gümrük Uzlaşma Komisyonu Üyelerine Ödenecek Ücrete İlişkin Esaslar’da belirtilen cetvelin yeniden düzenlenmesi talep edilmektedir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Kariyer - Gümrük Müşavirliği Hakkı:</h4>
      <ul>
        <li>Gümrük idaresinde en az 10 yıl çalışmış olup, bunun üç yılını şube müdürü, gümrük müdürü, gümrük muhafaza müdürü, Bölge Müdürlüklerinde bölge müdür yardımcısı görevlerinde geçirenlerden, görevlerinden istifa eden veya emekliye ayrılanlara sınav şartı aranmaksızın Gümrük Müşavirliği verilmesi.</li>
        <li>Gümrük ve dış ticaret mevzuatının uygulayıcıları arasında yer alan gümrük memurlarının mesleki deneyim ve kazanımlarının değerlendirilmesi amacıyla; 15 yıl görev yapan gümrük memurlarına Gümrük Müşavir Yardımcılığı, 25 yıl görev yapan gümrük memurlarına ise sınavsız Gümrük Müşavirliğinin eğitim, staj ve sınav şartı aranmaksızın verilmesi talep edilmektedir.</li>
      </ul>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Silah Talebi:</h4>
      <p>Gümrük memurları; gümrük ve dış ticaret mevzuatının sahadaki uygulayıcıları olarak kamu gelirlerinin tahsili, dış ticaretin düzenlenmesi ve kaçakçılıkla mücadelenin yürütülmesinde kritik görev üstlenmektedir. Bu görevler çoğu zaman sınır kapılarında, limanlarda, serbest bölgelerde, geçici depolama yerlerinde, antrepoda ve riskli sahalarda, 24 saat esasına dayalı vardiya sistemiyle yerine getirilmektedir.</p>
      <p>Görev esnasında gümrük memurları sıkça tehdit, şiddet ve hakaret gibi saldırılara maruz kalmakta, hatta geçmişte terör örgütü tarafından kaçırılma ve silahlı saldırı gibi ağır olaylar yaşanmıştır. Buna rağmen 640 sayılı KHK’nın 39. maddesi yalnızca bazı personel gruplarına silah taşıma yetkisi tanımış, doğrudan sahada görev yapan gümrük memurlarını kapsam dışında bırakmıştır. Bu durum, görev riskleri ile mevcut hukuki düzenleme arasında ciddi bir çelişki oluşturmaktadır.</p>
      <p>Gümrük hizmetlerinin bütünlüğü ve taşra teşkilatının güvenliği gözetilerek, 640 sayılı KHK’nın 39. maddesinde gerekli değişikliğin yapılması ve gümrük memurlarına da silah taşıma hakkının tanınması elzemdir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Ek Zam ve Tazminat Talebi (Depo/Ambar Görevleri):</h4>
      <p>Devlet Memurlarına Ödenecek Zam ve Tazminatlara İlişkin Karar ile Tasfiye Yönetmeliği kapsamında, gümrük idarelerinin kontrolü altında bulunan geçici depolama yerleri, antrepo ve ambarlarda eşya alınması, muhafazası ve teslimi işlemlerinde görev yapan personele, mevcut olarak ödenen; **500 puan** iş güçlüğü zammı, **575 puan** temininde güçlük zammı, Ambar ve sundurmalarda görev yapan personele **600 puan** iş güçlüğü zammı, ek olarak yapılan işlemlerin riski ve eşyaya zarar ziyan durumunda memura rücu edilmesinden mütevelli **1.000 puan** mali sorumluluk zammı verilmesi talep edilmektedir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Lisanslı Yediemin Depoları Lisans Talebi:</h4>
      <p>Lisanslı Yediemin Depoları Yönetmeliği kapsamında, gümrük idarelerinin kontrolü altında bulunan geçici depolama yerleri, antrepo ve ambarlara eşya alınması, muhafazası ve teslimi işlemlerinde görev yapan gümrük memurlarının, görevlerinden istifa eden veya emekliye ayrılanlara ilgili yönetmelik kapsamında lisans verilmesi talep edilmektedir.</p>

      <h4 style="color: var(--text); margin-top: 25px; margin-bottom: 5px;">Bilirkişilik Hakkında Düzenleme Talebi:</h4>
      <p>6754 sayılı Bilirkişilik Kanunu kapsamında, bilirkişi olma şartlarında yer alan “2-Gümrük müşaviri olmak veya kamu kurum ve kuruluşlarının merkez ve taşra teşkilatlarının gümrük ve dış ticaret ile ilgili birimlerinde muayene memuru, müdür, başmüdür, uzman, kontrolör, müfettiş olarak çalışıyor veya çalışmış olmak.” cümlesine muayene memurundan önce gelmek üzere **Gümrük Memurunun** eklenmesi talep edilmektedir.</p>
    `;

    // İçeriği innerHTML ile tek seferde yerleştiriyoruz.
    innerContent.innerHTML = content;

    // Ana modal pencereyi göster
    modal.style.display = 'block';
}

window.onclick = function(e) {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) modal.style.display = 'none';
};

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
}

// Sayfa yüklendiğinde favorileri kur
document.addEventListener('DOMContentLoaded', () => {
    // Tüm kartlara (normal ve dikey) yıldız ekle
    document.querySelectorAll('.link-card, .link-card-vertical').forEach((card, index) => {
        const cardId = 'card-' + index;
        card.setAttribute('data-id', cardId);

        const star = document.createElement('button');
        star.innerHTML = '★';
        star.className = 'fav-btn';
        star.title = "Favorilere Ekle/Çıkar";
        star.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(cardId);
        };
        card.appendChild(star);
    });
    loadFavorites();
});

function toggleFavorite(id) {
    let favs = JSON.parse(localStorage.getItem('gumrukFavs') || '[]');
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
    } else {
        favs.push(id);
    }
    localStorage.setItem('gumrukFavs', JSON.stringify(favs));
    loadFavorites();
}

function loadFavorites() {
    const favs = JSON.parse(localStorage.getItem('gumrukFavs') || '[]');
    const favoritesList = document.getElementById('favorites-list');

    // Yıldızları güncelle
    document.querySelectorAll('.fav-btn').forEach(btn => {
        const id = btn.parentElement.getAttribute('data-id');
        btn.classList.toggle('active', favs.includes(id));
    });

    // Favoriler sekmesini doldur
    if (favs.length === 0) {
        favoritesList.innerHTML = '<p style="color:var(--muted); grid-column: 1/-1; padding: 20px;">Henüz favori eklemediniz.</p>';
    } else {
        favoritesList.innerHTML = '';
        favs.forEach(id => {
            const originalCard = document.querySelector(`[data-id="${id}"]`);
            if (originalCard) {
                const clone = originalCard.cloneNode(true);
                // Klonun tıklama olayını tekrar bağla
                clone.querySelector('.fav-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(id);
                };
                favoritesList.appendChild(clone);
            }
        });
    }
}

// Arama fonksiyonu
const superSearch = document.getElementById('superSearch');
if (superSearch) {
    superSearch.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        // .link-card'a ek olarak .link-card-vertical ve tablo satırlarını (tr) da listeye ekledik
        const cards = document.querySelectorAll('.link-card, .link-card-vertical, tr');
        const sections = document.querySelectorAll('.tab-content');
        const body = document.body;

        if (term.length > 0) {
            body.classList.add('search-mode');
            sections.forEach(section => {
                let hasVisibleItem = false;

                // Bölüm içindeki tüm aranabilir öğeleri tara
                section.querySelectorAll('.link-card, .link-card-vertical, tr').forEach(item => {
                    const text = item.innerText.toLowerCase();
                    if (text.includes(term)) {
                        // Eğer öğe bir tablo satırıysa görünürlük tipini koru, değilse flex yap
                        item.style.display = (item.tagName === 'TR') ? "table-row" : "flex";
                        hasVisibleItem = true;
                    } else {
                        item.style.display = "none";
                    }
                });

                // Eğer bölüm içinde eşleşen bir şey varsa o sekmeyi göster
                if (hasVisibleItem) {
                    section.classList.add('active');
                    section.style.display = "block";
                } else {
                    section.classList.remove('active');
                    section.style.display = "none";
                }
            });
        } else {
            // Arama kutusu temizlendiğinde her şeyi eski haline getir
            body.classList.remove('search-mode');
            sections.forEach(s => {
                s.classList.remove('active');
                s.style.display = "";
            });
            cards.forEach(c => c.style.display = "");

            // Aktif olan orijinal sekmeyi geri yükle
            const activeBtn = document.querySelector('.tab-button.active');
            if(activeBtn) {
                const activeTabId = activeBtn.getAttribute('data-tab');
                const activeContent = document.getElementById(activeTabId);
                if(activeContent) activeContent.style.display = "block";
            }
        }
    });
}

// --- NOT DEFTERİ KAYDETME MOTORU 2 (gumrukNotlari) ---
// Note: Duplicate functionality for another localStorage key 'gumrukNotlari'
document.addEventListener('DOMContentLoaded', function() {
    const noteArea = document.getElementById('noteInput');
    const statusText = document.getElementById('saveStatus');

    // Hafızadan notu yükle
    const savedData = localStorage.getItem('gumrukNotlari');
    if (savedData && noteArea) {
        // Only overwrite if not already set by gumrukNotes?
        // Or maybe gumrukNotlari is the intended one?
        // The previous block sets it from gumrukNotes.
        // I will preserve both logics as they were in the original file.
        // It seems the original file had duplicate logic, effectively running twice.
        // The last one to run (DOMContentLoaded) will win if they run in order.
        // However, I'll keep it as is to ensure "preservation of content".
        noteArea.value = savedData;
    }

    // Yazarken anlık kaydet
    if (noteArea) {
        noteArea.addEventListener('input', function() {
            localStorage.setItem('gumrukNotlari', noteArea.value);

            if (statusText) {
                statusText.innerText = "💾 Kaydedildi...";
                setTimeout(() => {
                    statusText.innerText = "Otomatik kaydediliyor...";
                }, 1000);
            }
        });
    }
});

function masaustuneKısayolOlustur() {
    const urlIcerigi = "[InternetShortcut]\r\nURL=https://serhansaygn-a11y.github.io/gumruk-memuru/\r\nIconIndex=0";
    const blob = new Blob([urlIcerigi], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = "Gümrük_Paneli.url";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// --- PDF İŞLEM MOTORU BAŞLANGIÇ ---
let secilenDosyalar = [];

function togglePdfPanel() {
    const panel = document.getElementById('pdfPanel');
    if(panel) panel.style.display = (panel.style.display === "block") ? "none" : "block";
}

function dosyaSecildi() {
    const input = document.getElementById('pdfInput');
    const list = document.getElementById('fileList');
    secilenDosyalar = Array.from(input.files);
    list.innerHTML = secilenDosyalar.map(f => "📄 " + f.name).join("<br>");
}

async function pdfIsle(mod) {
    if (secilenDosyalar.length === 0) { alert("Önce dosya seçin!"); return; }
    try {
        if (mod === 'birleştir') {
            const resultPdf = await PDFLib.PDFDocument.create();
            for (const f of secilenDosyalar) {
                const doc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
                const pages = await resultPdf.copyPages(doc, doc.getPageIndices());
                pages.forEach(p => resultPdf.addPage(p));
            }
            indirPdf(await resultPdf.save(), "Birleştirilmiş_Gümrük.pdf");
        }
        else if (mod === 'ayır') {
            const f = secilenDosyalar[0];
            const doc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
            const pageCount = doc.getPageCount();
            for (let i = 0; i < pageCount; i++) {
                const subDoc = await PDFLib.PDFDocument.create();
                const [page] = await subDoc.copyPages(doc, [i]);
                subDoc.addPage(page);
                indirPdf(await subDoc.save(), `Sayfa_${i+1}_${f.name}`);
            }
        }
        else if (mod === 'küçült') {
            const f = secilenDosyalar[0];
            const doc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
            const saved = await doc.save({ useObjectStreams: true });
            indirPdf(saved, "Küçültülmüş_" + f.name);
        }
    } catch (e) {
        alert("Hata oluştu: " + e.message);
    }
}

function indirPdf(bytes, name) {
    const blob = new Blob([bytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
}
// --- PDF İŞLEM MOTORU BİTİŞ ---

// SAAT VE TARİH MOTORU
function zamaniBaslat() {
    const zamanElement = document.getElementById('canli-zaman');
    if (!zamanElement) return;

    function guncelle() {
        const simdi = new Date();
        const gun = String(simdi.getDate()).padStart(2, '0');
        const ay = String(simdi.getMonth() + 1).padStart(2, '0');
        const yil = simdi.getFullYear();
        const saat = String(simdi.getHours()).padStart(2, '0');
        const dakika = String(simdi.getMinutes()).padStart(2, '0');
        const saniye = String(simdi.getSeconds()).padStart(2, '0');
        const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        const gunAdi = gunler[simdi.getDay()];

        zamanElement.innerText = `${gun}.${ay}.${yil} ${gunAdi} | ${saat}:${dakika}:${saniye}`;
    }

    setInterval(guncelle, 1000);
    guncelle();
}

// Sayfa hazır olduğunda çalıştır
if (document.readyState === 'complete') {
    zamaniBaslat();
} else {
    window.addEventListener('load', zamaniBaslat);
}

// Döviz Kurlarını Çeken Sistem
async function dovizCek() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();

        const usd = data.rates.TRY;
        const eur = (usd / data.rates.EUR).toFixed(4);
        const gbp = (usd / data.rates.GBP).toFixed(4);

        if(document.getElementById('usd-rate')) document.getElementById('usd-rate').innerText = usd.toFixed(4) + " ₺";
        if(document.getElementById('eur-rate')) document.getElementById('eur-rate').innerText = eur + " ₺";
        if(document.getElementById('gbp-rate')) document.getElementById('gbp-rate').innerText = gbp + " ₺";
    } catch (error) {
        console.log("Kur çekilemedi.");
    }
}

// Sayfa açıldığında kurları getir
dovizCek();
// 5 dakikada bir güncelle
setInterval(dovizCek, 600000);

// Kurları canlı tutma motoru
setInterval(function() {
    if (typeof fetchCurrencies === "function") {
        fetchCurrencies();
        console.log("Kurlar canlı olarak güncellendi.");
    }
}, 300000); // 300.000 milisaniye = 5 Dakika
