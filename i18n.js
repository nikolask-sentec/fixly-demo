// English keys keep the demo's internal workflow values stable.
// Columns: Bahasa Indonesia | Simplified Chinese | Russian.
const rows = `
Language|Bahasa|语言|Язык
Customer|Pelanggan|客户|Клиент
Admin|Admin|管理员|Администратор
Handyman|Teknisi|维修师傅|Мастер
Overview|Ringkasan|概览|Обзор
My bookings|Pesanan saya|我的预约|Мои заявки
Registration|Pendaftaran|注册|Регистрация
Service catalog|Katalog layanan|服务目录|Каталог услуг
Partner approvals|Verifikasi mitra|合作伙伴审核|Проверка мастеров
Jobs|Pekerjaan|工单|Заявки
My jobs|Pekerjaan saya|我的工单|Мои задания
FIXLY DESIGN PREVIEW|PRATINJAU DESAIN FIXLY|FIXLY 设计预览|ДЕМО FIXLY
· Sample data only. No real bookings, uploads or payments.|· Hanya data contoh. Tidak ada pesanan, unggahan, atau pembayaran nyata.|· 仅使用示例数据，不产生真实预约、上传或付款。|· Только примеры. Без реальных заявок, загрузок и платежей.
Reset demo ↻|Atur ulang demo ↻|重置演示 ↻|Сбросить демо ↻
Choose app view|Pilih tampilan aplikasi|选择应用视图|Выберите роль
CUSTOMER WORKSPACE|AREA PELANGGAN|客户工作区|КАБИНЕТ КЛИЕНТА
ADMIN WORKSPACE|AREA ADMIN|管理工作区|КАБИНЕТ АДМИНИСТРАТОРА
PARTNER WORKSPACE|AREA MITRA|合作伙伴工作区|КАБИНЕТ МАСТЕРА
Good help.|Bantuan andal.|贴心服务。|Надёжная помощь.
Close to home.|Dekat rumah.|就在身边。|Рядом с домом.
A comfortable home starts with a little care.|Rumah nyaman dimulai dari perawatan kecil.|舒适的家，从细心维护开始。|Уютный дом начинается с заботы.
Better service starts with people who care.|Layanan lebih baik dimulai dari kepedulian.|用心的人，带来更好的服务。|Хороший сервис начинается с заботливых людей.
Interactive prototype · v1|Prototipe interaktif · v1|交互原型 · v1|Интерактивный прототип · v1
YOUR HOME, IN GOOD HANDS|RUMAH ANDA DI TANGAN YANG TEPAT|让您的家得到妥善照顾|ВАШ ДОМ В НАДЁЖНЫХ РУКАХ
KEEP EVERYTHING RUNNING|PASTIKAN SEMUA BERJALAN LANCAR|让一切顺利运转|ВСЁ ПОД КОНТРОЛЕМ
INDEPENDENT SERVICE PARTNERS|MITRA LAYANAN MANDIRI|独立服务合作伙伴|НЕЗАВИСИМЫЕ МАСТЕРА
A little help. A better home.|Sedikit bantuan. Rumah lebih nyaman.|一点帮助，让家更好。|Немного помощи. Больше уюта.
Your service desk.|Pusat layanan Anda.|您的服务中心。|Ваш центр управления.
Make today a good workday.|Mari bekerja dengan baik hari ini.|开启美好工作日。|Пусть рабочий день будет удачным.
⌖ Service area|⌖ Area layanan|⌖ 服务区域|⌖ Зона обслуживания
Admin demo|Demo admin|管理员演示|Демо администратора
Dismiss message|Tutup pesan|关闭消息|Закрыть сообщение
LESS TO WORRY ABOUT|KURANGI KEKHAWATIRAN|少一些烦恼|МЕНЬШЕ ЗАБОТ
That little repair?|Ada yang perlu diperbaiki?|家里需要小修小补？|Нужен небольшой ремонт?
Let’s take care of it.|Biar kami bantu.|交给我们吧。|Мы поможем.
Book skilled help for your home, with clear prices and a time that works for you.|Pesan bantuan ahli untuk rumah Anda, dengan harga jelas dan waktu yang sesuai.|预约专业上门服务，价格清晰，时间灵活。|Закажите помощь мастера по понятной цене и в удобное время.
Find a service|Cari layanan|查找服务|Найти услугу
⌂   A happy home|⌂   Rumah yang nyaman|⌂   幸福之家|⌂   Уютный дом
What can we help with?|Apa yang bisa kami bantu?|您需要什么帮助？|Чем мы можем помочь?
services near you|layanan di dekat Anda|项附近服务|услуг рядом с вами
All services|Semua layanan|全部服务|Все услуги
AC & cooling|AC & pendingin|空调与制冷|Кондиционеры
Plumbing|Perpipaan|水管维修|Сантехника
Electrical|Kelistrikan|电气维修|Электрика
AC deep cleaning|Pembersihan AC menyeluruh|空调深度清洗|Глубокая чистка кондиционера
Leaking tap repair|Perbaikan keran bocor|水龙头漏水维修|Ремонт протекающего крана
Light installation|Pemasangan lampu|灯具安装|Установка светильника
Fresh filters, a clean evaporator and a cooling check. Give your AC a fresh start.|Bersihkan filter dan evaporator, lalu periksa pendinginan. Segarkan kembali AC Anda.|清洗滤网和蒸发器，检查制冷效果，让空调焕然一新。|Очистка фильтров и испарителя, проверка охлаждения. Свежесть для вашего кондиционера.
Find the leak and repair your tap. Replacement fixtures are quoted separately.|Temukan kebocoran dan perbaiki keran. Penggantian perlengkapan ditawarkan terpisah.|检查漏水原因并维修水龙头，更换配件另行报价。|Поиск протечки и ремонт крана. Замена деталей оплачивается по отдельной смете.
Install your new light on an existing connection. A brighter room, without the hassle.|Pasang lampu baru pada sambungan yang tersedia. Ruangan lebih terang tanpa repot.|利用现有线路安装新灯具，轻松点亮房间。|Установка нового светильника на готовую проводку. Больше света без хлопот.
per|per|每|за
AC unit|unit AC|台空调|кондиционер
tap|keran|个水龙头|кран
fitting|lampu|个灯具|светильник
visit|kunjungan|次上门|выезд
Book |Pesan |预约 |Заказать: 
No published services here yet. Try another area.|Belum ada layanan terbit di sini. Coba area lain.|此区域暂无已发布服务，请选择其他区域。|Здесь пока нет опубликованных услуг. Выберите другую зону.
✓ Clear unit pricing|✓ Harga satuan jelas|✓ 单价透明|✓ Понятные цены
✓ Manually verified partners|✓ Mitra diverifikasi manual|✓ 人工审核合作伙伴|✓ Ручная проверка мастеров
✓ Approve the quote before work|✓ Setujui penawaran sebelum pengerjaan|✓ 开工前确认报价|✓ Согласование сметы до начала работ
Active jobs|Pekerjaan aktif|进行中的工单|Активные заявки
Across all service areas|Di seluruh area layanan|覆盖所有服务区域|Во всех зонах обслуживания
Published services|Layanan terbit|已发布服务|Опубликованные услуги
service areas|area layanan|个服务区域|зон обслуживания
Waiting for verification|Menunggu verifikasi|等待审核|Ожидают проверки
Independent partner applications|Pendaftaran mitra mandiri|独立合作伙伴申请|Заявки независимых мастеров
PEOPLE FIRST|UTAMAKAN MANUSIA|以人为本|ЛЮДИ ПРЕЖДЕ ВСЕГО
A new partner is ready for review.|Mitra baru siap ditinjau.|一位新伙伴等待审核。|Новый мастер ожидает проверки.
Review identity, contact and bank details before opening job access.|Tinjau identitas, kontak, dan rekening sebelum memberi akses pekerjaan.|开放接单权限前，请审核身份、联系方式和银行信息。|Проверьте личность, контакты и банковские реквизиты перед допуском к заказам.
Review application ↗|Tinjau pendaftaran ↗|审核申请 ↗|Проверить заявку ↗
Recent requests|Permintaan terbaru|最新请求|Последние заявки
Manage jobs →|Kelola pekerjaan →|管理工单 →|Управлять заявками →
YOUR SKILLS. YOUR NEXT OPPORTUNITY.|KEAHLIAN ANDA. PELUANG BERIKUTNYA.|发挥技能，迎接新机会。|ВАШИ НАВЫКИ. НОВЫЕ ВОЗМОЖНОСТИ.
Ready to make someone’s day?|Siap membantu hari seseorang?|准备好为他人带来便利了吗？|Готовы сделать чей-то день лучше?
A quick review, then you’re ready.|Selesaikan verifikasi, lalu mulai bekerja.|审核通过后即可接单。|Пройдите проверку — и можно начинать.
Your assigned jobs and next steps are all here.|Pekerjaan Anda dan langkah berikutnya ada di sini.|已分配工单和后续步骤都在这里。|Здесь ваши задания и дальнейшие действия.
Your application needs manual approval before you can receive household service jobs.|Pendaftaran Anda perlu disetujui manual sebelum menerima pekerjaan rumah tangga.|您的申请需要人工审核通过后，才能接收家庭维修工单。|Для получения заказов на бытовые услуги ваша заявка должна пройти ручную проверку.
View my jobs ↗|Lihat pekerjaan saya ↗|查看我的工单 ↗|Мои задания ↗
Preview registration ↗|Pratinjau pendaftaran ↗|预览注册流程 ↗|Посмотреть регистрацию ↗
Application|Pendaftaran|申请|Заявка
Independent partner|Mitra mandiri|独立合作伙伴|Независимый мастер
Assigned jobs|Pekerjaan ditugaskan|已分配工单|Назначенные задания
Verified access required|Perlu verifikasi akses|需通过审核|Требуется подтверждённый доступ
In this demo session|Dalam sesi demo ini|本次演示会话|В этой демосессии
Pending review|Menunggu peninjauan|待审核|Ожидает проверки
Approved|Disetujui|已通过|Одобрено
Changes requested|Perlu perubahan|需要修改|Требуются изменения
Rejected|Ditolak|已拒绝|Отклонено
Requested|Diajukan|已申请|Подана
Assigned|Ditugaskan|已分配|Назначена
On the way|Dalam perjalanan|正在前往|В пути
Diagnosing|Pemeriksaan|正在检查|Диагностика
Quote ready|Penawaran siap|报价待确认|Смета готова
In progress|Sedang dikerjakan|施工中|В работе
Completed|Selesai|已完成|Завершено
Cancelled|Dibatalkan|已取消|Отменено
Your application is|Status pendaftaran Anda:|您的申请状态：|Статус вашей заявки:
An administrator must approve your details before you can receive jobs.|Admin harus menyetujui data Anda sebelum Anda menerima pekerjaan.|管理员批准您的资料后才能接单。|Администратор должен одобрить ваши данные до получения заказов.
For this walkthrough, switch to Admin → Partner approvals.|Untuk mencoba, pilih Admin → Verifikasi mitra.|体验此流程，请切换至管理员 → 合作伙伴审核。|Для демонстрации перейдите в Администратор → Проверка мастеров.
Tomorrow, 09:00|Besok, 09.00|明天 09:00|Завтра, 09:00
The living room AC is not cooling well.|AC ruang tamu kurang dingin.|客厅空调制冷效果不好。|Кондиционер в гостиной плохо охлаждает.
⌖ Sample home · Jimbaran|⌖ Rumah contoh · Jimbaran|⌖ 示例住宅 · Jimbaran|⌖ Пример дома · Джимбаран
Total work quote:|Total penawaran:|施工总报价：|Общая смета:
Assign to Andi|Tugaskan ke Andi|分配给 Andi|Назначить Andi
Approve the sample partner first.|Setujui mitra contoh terlebih dahulu.|请先批准示例合作伙伴。|Сначала одобрите демонстрационного мастера.
Start travelling|Mulai perjalanan|开始出发|Выехать
I’ve arrived|Saya sudah tiba|我已到达|Я на месте
Total quote (IDR)|Total penawaran (IDR)|总报价（IDR）|Общая смета (IDR)
Send quote|Kirim penawaran|发送报价|Отправить смету
Complete work|Selesaikan pekerjaan|完成工作|Завершить работу
Approve quote|Setujui penawaran|确认报价|Одобрить смету
Cancel request|Batalkan permintaan|取消申请|Отменить заявку
Payment integration is planned; no payment is collected.|Integrasi pembayaran direncanakan; tidak ada pembayaran yang ditagih.|支付功能尚在规划中，不收取任何费用。|Платежи пока не подключены; оплата не взимается.
No bookings yet. Explore the services to create a sample request.|Belum ada pesanan. Jelajahi layanan untuk membuat permintaan contoh.|暂无预约。浏览服务并创建示例申请。|Заявок пока нет. Выберите услугу и создайте пробную заявку.
New job group|Grup pekerjaan baru|新服务分类|Новая группа услуг
Add group|Tambah grup|添加分类|Добавить группу
+ Create job item|+ Buat item pekerjaan|+ 新建服务项目|+ Создать услугу
Service / job group|Layanan / grup pekerjaan|服务 / 分类|Услуга / группа
Unit price|Harga satuan|单价|Цена за единицу
Availability by area|Ketersediaan per area|区域可用性|Доступность по зонам
Status|Status|状态|Статус
Actions|Tindakan|操作|Действия
Published|Terbit|已发布|Опубликовано
Draft|Draf|草稿|Черновик
Edit|Ubah|编辑|Изменить
Unpublish|Batalkan publikasi|取消发布|Снять с публикации
Publish|Terbitkan|发布|Опубликовать
Area switches immediately change the customer demo. Editing a demo item saves it as a draft until you publish it again. Existing bookings keep their original unit price.|Perubahan area langsung berlaku di demo pelanggan. Item yang diubah menjadi draf hingga diterbitkan kembali. Pesanan lama tetap memakai harga awal.|区域开关会立即更新客户演示。编辑后项目将保存为草稿，需重新发布。已有预约保留原单价。|Переключатели зон сразу меняют демо клиента. После редактирования услуга сохраняется как черновик до повторной публикации. Цена существующих заявок не меняется.
PARTNER APPLICATION|PENDAFTARAN MITRA|合作伙伴申请|ЗАЯВКА МАСТЕРА
Independent handyman · Jimbaran|Teknisi mandiri · Jimbaran|独立维修师傅 · Jimbaran|Независимый мастер · Джимбаран
Email|Email|电子邮箱|Электронная почта
Phone|Telepon|电话|Телефон
Home base|Alamat utama|常驻地址|Основной адрес
Bank|Bank|银行|Банк
SAMPLE ID — NOT VALID|IDENTITAS CONTOH — TIDAK SAH|示例证件 — 无效|ОБРАЗЕЦ ДОКУМЕНТА — НЕДЕЙСТВИТЕЛЕН
DEMO PARTNER|MITRA DEMO|演示合作伙伴|ДЕМОНСТРАЦИОННЫЙ МАСТЕР
Illustration for design review only|Ilustrasi hanya untuk tinjauan desain|仅用于设计预览的示意图|Иллюстрация только для просмотра дизайна
No actual identity document|Bukan dokumen identitas asli|非真实身份证件|Не настоящий документ
Manual verification|Verifikasi manual|人工审核|Ручная проверка
Confirm the required details before approving a partner.|Konfirmasi data wajib sebelum menyetujui mitra.|批准合作伙伴前，请确认必要信息。|Подтвердите обязательные сведения перед одобрением мастера.
ID image is readable and matches the applicant|Foto identitas terbaca dan sesuai dengan pendaftar|证件照片清晰且与申请人一致|Документ читаем и соответствует заявителю
Email and phone details have been checked|Email dan nomor telepon sudah diperiksa|已核查电子邮箱和电话号码|Почта и телефон проверены
Bank details have been checked|Data rekening sudah diperiksa|已核查银行信息|Банковские реквизиты проверены
Review notes|Catatan peninjauan|审核备注|Примечания к проверке
Explain any changes needed|Jelaskan perubahan yang diperlukan|说明需要修改的内容|Укажите необходимые изменения
Approve partner|Setujui mitra|批准合作伙伴|Одобрить мастера
Request changes|Minta perubahan|要求修改|Запросить изменения
Reject application|Tolak pendaftaran|拒绝申请|Отклонить заявку
Review saved:|Peninjauan tersimpan:|审核已保存：|Проверка сохранена:
BECOME AN INDEPENDENT PARTNER|JADI MITRA MANDIRI|成为独立合作伙伴|СТАНЬТЕ НЕЗАВИСИМЫМ МАСТЕРОМ
WELCOME HOME|SELAMAT DATANG|欢迎回家|ДОБРО ПОЖАЛОВАТЬ ДОМОЙ
Good work starts here.|Pekerjaan baik dimulai di sini.|优质服务从这里开始。|Хорошая работа начинается здесь.
Let’s get your home ready.|Siapkan rumah Anda.|让我们完善您的家庭资料。|Подготовим ваш дом.
Try the registration flow using the sample details provided.|Coba alur pendaftaran dengan data contoh yang tersedia.|使用提供的示例资料体验注册流程。|Попробуйте регистрацию с предложенными примерными данными.
Contact details|Data kontak|联系方式|Контактные данные
Identity & bank account|Identitas & rekening bank|身份与银行账户|Документ и банковский счёт
Home location|Lokasi rumah|家庭位置|Местоположение дома
Review & submit|Tinjau & kirim|确认并提交|Проверка и отправка
Your details|Data Anda|您的资料|Ваши данные
Pinpoint your entrance|Tandai pintu masuk Anda|标记入口位置|Укажите вход
Looks good?|Sudah sesuai?|信息正确吗？|Всё верно?
G   Continue with Google|G   Lanjutkan dengan Google|G   使用 Google 继续|G   Продолжить с Google
Full name|Nama lengkap|姓名|Полное имя
Phone number|Nomor telepon|电话号码|Номер телефона
Home address|Alamat rumah|家庭地址|Домашний адрес
ID card photo|Foto kartu identitas|身份证件照片|Фото удостоверения личности
Use a synthetic sample for this walkthrough.|Gunakan contoh buatan untuk demo ini.|请使用虚构示例体验此流程。|Используйте искусственный образец для демонстрации.
✓ Sample ID attached|✓ Identitas contoh terlampir|✓ 已附加示例证件|✓ Образец документа прикреплён
Attach sample ID|Lampirkan identitas contoh|附加示例证件|Прикрепить образец документа
Bank name|Nama bank|银行名称|Название банка
Bank account number|Nomor rekening bank|银行账号|Номер банковского счёта
I am an independent partner, not an employee.|Saya adalah mitra mandiri, bukan karyawan.|我是独立合作伙伴，并非公司员工。|Я независимый мастер, а не сотрудник компании.
Address|Alamat|地址|Адрес
Illustrative location picker. Click to place pin or press Enter for center.|Peta ilustrasi. Klik untuk menandai atau tekan Enter untuk posisi tengah.|示意位置选择器。点击放置标记，或按回车键定位到中央。|Схематичная карта. Нажмите для установки метки или Enter для центра.
ILLUSTRATIVE MAP · NOT GOOGLE MAPS|PETA ILUSTRASI · BUKAN GOOGLE MAPS|示意地图 · 非 GOOGLE 地图|СХЕМАТИЧНАЯ КАРТА · НЕ GOOGLE MAPS
Click to move the sample pin. Live Google Maps will be connected in the full app.|Klik untuk memindahkan penanda contoh. Google Maps akan dihubungkan pada aplikasi lengkap.|点击移动示例标记。完整应用将接入 Google 地图。|Нажмите, чтобы переместить метку. В полной версии будет подключена Google Maps.
Landmark / access instructions|Patokan / petunjuk akses|地标 / 进入指引|Ориентир / инструкции по доступу
Near the corner, blue gate…|Dekat sudut, gerbang biru…|转角附近，蓝色大门…|У угла, синие ворота…
Sample ID attached|Identitas contoh terlampir|已附加示例证件|Образец документа прикреплён
No sample ID attached|Belum ada identitas contoh|尚未附加示例证件|Образец документа не прикреплён
An administrator must manually approve the application before you can receive jobs.|Admin harus menyetujui pendaftaran secara manual sebelum Anda menerima pekerjaan.|管理员必须手动批准申请后，您才能接单。|Для получения заказов администратор должен вручную одобрить заявку.
Payment setup is deferred. No card details are collected.|Pengaturan pembayaran ditunda. Data kartu tidak dikumpulkan.|支付设置暂未开放，不收集银行卡信息。|Настройка платежей отложена. Данные карт не собираются.
Back|Kembali|返回|Назад
Submit demo|Kirim demo|提交演示|Отправить демо
Continue →|Lanjutkan →|继续 →|Продолжить →
Designed for better days at home.|Dirancang untuk kenyamanan di rumah.|让居家生活更美好。|Для комфортной жизни дома.
A LITTLE HELP IS ON THE WAY|BANTUAN SEGERA DATANG|贴心帮助即将到来|ПОМОЩЬ УЖЕ В ПУТИ
Close booking|Tutup pesanan|关闭预约|Закрыть заявку
Quantity|Jumlah|数量|Количество
Preferred visit|Waktu kunjungan|期望上门时间|Удобное время визита
Tell us what’s happening|Ceritakan masalahnya|请描述问题|Опишите проблему
Service estimate|Perkiraan biaya layanan|服务预估费用|Оценка стоимости
Additional work is quoted separately and needs your approval.|Pekerjaan tambahan ditawarkan terpisah dan memerlukan persetujuan Anda.|额外工作将单独报价，并需您确认。|Дополнительные работы рассчитываются отдельно и требуют вашего согласия.
Create demo booking|Buat pesanan demo|创建演示预约|Создать пробную заявку
Close editor|Tutup editor|关闭编辑器|Закрыть редактор
Job item|Item pekerjaan|服务项目|Услуга
Job name|Nama pekerjaan|服务名称|Название услуги
Job group|Grup pekerjaan|服务分类|Группа услуг
Description|Deskripsi|描述|Описание
Unit price (IDR)|Harga satuan (IDR)|单价（IDR）|Цена за единицу (IDR)
Billing unit|Satuan penagihan|计费单位|Единица расчёта
Save draft|Simpan draf|保存草稿|Сохранить черновик
Demo reset. All changes stay in this browser session.|Demo diatur ulang. Perubahan hanya berlaku dalam sesi browser ini.|演示已重置。所有更改仅保留在本次浏览器会话中。|Демо сброшено. Все изменения действуют только в этой сессии браузера.
Demo booking created. Switch to Admin to assign it.|Pesanan demo dibuat. Pilih Admin untuk menugaskannya.|演示预约已创建。切换至管理员分配工单。|Пробная заявка создана. Переключитесь на администратора для назначения.
Saved as a demo draft. Publish it to show it to customers.|Disimpan sebagai draf demo. Terbitkan agar terlihat oleh pelanggan.|已保存为演示草稿。发布后客户即可看到。|Сохранено как черновик. Опубликуйте, чтобы показать клиентам.
Check all three verification items before approval.|Centang ketiga verifikasi sebelum menyetujui.|批准前请勾选全部三项审核内容。|Перед одобрением отметьте все три пункта проверки.
Add a reason for the applicant.|Tambahkan alasan untuk pendaftar.|请向申请人说明原因。|Укажите причину для заявителя.
Application updated. See the Handyman view for the result.|Pendaftaran diperbarui. Lihat hasil di tampilan Teknisi.|申请已更新。请在维修师傅视图中查看结果。|Заявка обновлена. Результат доступен в кабинете мастера.
Demo job updated: |Pekerjaan demo diperbarui: |演示工单已更新：|Демозадание обновлено: 
Demo application sent for manual review. Switch to Admin → Partner approvals.|Pendaftaran demo dikirim untuk verifikasi manual. Pilih Admin → Verifikasi mitra.|演示申请已提交人工审核。切换至管理员 → 合作伙伴审核。|Демозаявка отправлена на ручную проверку. Перейдите в Администратор → Проверка мастеров.
Demo profile ready. You can now explore services.|Profil demo siap. Anda dapat menjelajahi layanan.|演示资料已就绪，您现在可以浏览服务。|Демопрофиль готов. Теперь можно выбирать услуги.
Google sign-in preview only. No Google account is connected.|Hanya pratinjau login Google. Tidak ada akun Google yang terhubung.|仅为 Google 登录预览，未连接任何 Google 账号。|Это только демонстрация входа через Google. Аккаунт Google не подключён.
`;
export const locales = { en: "en-US", id: "id-ID", zh: "zh-CN", ru: "ru-RU" };
export const messages = Object.fromEntries(
  rows
    .trim()
    .split("\n")
    .map((line) => {
      const [key, id, zh, ru] = line.split("|");
      if (!id || !zh || !ru) throw new Error("Incomplete translation: " + key);
      return [key, { id, zh, ru }];
    }),
);
export function translate(value, language) {
  if (typeof value !== "string" || language === "en") return value;
  const exact = messages[value]?.[language];
  if (exact) return exact;
  for (const prefix of ["Demo job updated: ", "Book "]) {
    if (value.startsWith(prefix))
      return (
        messages[prefix][language] +
        translate(value.slice(prefix.length), language)
      );
  }
  const status = Object.keys(messages).find(
    (key) => key.toLowerCase() === value,
  );
  return status ? messages[status][language] : value;
}
export function savedLanguage() {
  try {
    const value = localStorage.getItem("fixly-language");
    return Object.hasOwn(locales, value) ? value : "en";
  } catch {
    return "en";
  }
}
