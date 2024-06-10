const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ua", "pl", "en"];
const currentPathName = window.location.pathname;
let currentLang =
	localStorage.getItem("language") || checkBrowserLang() || "ua";
let currentTexts = {};

const homeTexts = {

    "head": {
        ua: "Є питання? То питайте!",
        pl: "Masz pytanie? Więc zapytaj!",
        en: "Have a question? So ask!",
    },

	"navbar-1": {
		ua: "Головна",
		pl: "Glówna",
		en: "Home",
	},
    "navbar-2": {
		ua: "Поради",
		pl: "Porady",
		en: "Advice",
	},
    "navbar-3": {
		ua: "Плюси збірки",
		pl: "Zalety",
		en: "Pluses",
	},
    "navbar-4": {
		ua: "Контакти",
		pl: "Kontakty",
		en: "Contacts",
	},
    "navbar-5": {
		ua: "Мова",
		pl: "Język",
		en: "Language",
	},

    "carousel-1": {
        ua:"Збірка власного комп'ютера має безліч переваг",
        pl:"Zbudowanie własnego komputera ma wiele zalet",
        en:"Building your own computer has many advantages",
    },
    "carousel-1_1": {
        ua:"Це може бути чудовим рішенням для тих,",
        pl:"Może to być świetne rozwiązanie dla tych,",
        en:"This can be a great solution for those",
    },
    "carousel-1_2": {
        ua: "хто хоче мати контроль над усіма",
        pl: "którzy chcą mieć kontrolę nad wszystkimi",
        en: "who want to have control over",
    },
    "carousel-1_3": {
        ua: "аспектами своєї системи.",
        pl: "aspektami swojego systemu.",
        en: "all aspects of their system.",
    },

    
    "carousel-2": {
        ua:"Збираючи свій ПК можна",
        pl:"Składając swój komputer, możesz",
        en:"When assembling your PC,",
    },
    "carousel-2_1": {
        ua:"більше приділити увагу потужності",
        pl:"skupić większą uwagę na moc",
        en:"Tyou can pay more attention o",
    },
    "carousel-2_2": {
        ua: "заліза, не переплачуючи за",
        pl: "żelaza, nie przepłacając",
        en: "the power of iron, without overpaying",
    },
    "carousel-2_3": {
        ua: "не так важливий корпус",
        pl: "za mniej ważną obudowę",
        en: "for a less important case",
    },

    "carousel-3": {
        ua: "Збирайте ПК вдома та створюйте ідеальну систему!",
        pl: "Złóż komputer w domu i stwórz idealny system!",
        en: "Assemble a PC at home and create the perfect system!",
    },

    "card-1": {
        ua:"Процесор",
        pl:"Procesor",
        en:"Processor",
    },
    "card-1_1": {
        ua:"Процесор",
        pl:"Procesor",
        en:"Processor",
    },

    "card-2": {
        ua:"Материнська плата",
        pl:"Płyta główna",
        en:"Motherboard",
    },
    "card-2_1": {
        ua:"Материнська плата",
        pl:"Płyta główna",
        en:"Motherboard",
    },
    "card-3": {
        ua:"Відеокарта",
        pl:"Karta graficzna",
        en:"Video card",
    },
    "card-3_1": {
        ua:"Відеокарта",
        pl:"Karta graficzna",
        en:"Video card",
    },
    "card-4": {
        ua:"Блок живлення",
        pl:"Zasilacz",
        en:"Power Supply",
    },
    "card-4_1": {
        ua:"Блок живлення",
        pl:"Zasilacz",
        en:"Power Supply",
    },

    "pluses-1": {
        ua:"Плюси збирання комп'ютера вдома",
        pl:"Zalety składania komputera w domu",
        en:"Advantages of Building a Computer at Home",
    },
    "pluses-2": {
        ua: "Збірка комп'ютера власноруч може здаватися складним завданням, особливо для новачків. Проте, це має багато переваг.",
        pl: "Składanie komputera samodzielnie może wydawać się trudnym zadaniem, zwłaszcza dla początkujących. Jednak ma to wiele zalet.",
        en: "Building a computer on your own might seem like a daunting task, especially for beginners. However, it has many advantages.",
    },
    "pluses-3": {
        ua: "По-перше, збираючи ПК самостійно, ви можете знайти найкращі пропозиції та знижки, обирати бюджетні варіанти або преміум-класу. Це дозволяє зекономити кошти та уникнути плати за складання, яку додають магазини.",
        pl: "Po pierwsze, składając komputer samodzielnie, możesz znaleźć najlepsze oferty i zniżki, wybierać opcje budżetowe lub premium. Pozwala to zaoszczędzić pieniądze i uniknąć opłaty za złożenie, którą dodają sklepy.",
        en: "Firstly, by building your own PC, you can find the best deals and discounts, choosing either budget or premium options. This allows you to save money and avoid the assembly fee that stores usually add.",
    },
    "pluses-4": {
        ua: "По-друге, ви отримуєте повний контроль над якістю компонентів, обираючи надійні бренди та переконуючись, що всі частини сумісні між собою. Це дозволяє створити систему, яка найкраще відповідає вашим вимогам.",
        pl: "Po drugie, masz pełną kontrolę nad jakością komponentów, wybierając niezawodne marki i upewniając się, że wszystkie części są ze sobą kompatybilne. Pozwala to stworzyć system, który najlepiej odpowiada Twoim wymaganiom.",
        en: "Secondly, you have complete control over the quality of the components by choosing reliable brands and ensuring all parts are compatible. This allows you to create a system that best meets your requirements.",
    },
    "pluses-5": {
        ua: "Третім плюсом є можливість оновлення. Власноруч зібраний комп'ютер легше оновлювати в майбутньому, адже ви краще розумієте, як він працює, і можете легко замінити або додати компоненти. Це робить ваш ПК більш гнучким та готовим до майбутніх змін і технологічних нововведень.",
        pl: "Trzecim plusem jest możliwość aktualizacji. Własnoręcznie złożony komputer łatwiej zaktualizować w przyszłości, ponieważ lepiej rozumiesz, jak działa, i możesz łatwo wymieniać lub dodawać komponenty. To sprawia, że Twój komputer jest bardziej elastyczny i gotowy na przyszłe zmiany oraz nowości technologiczne.",
        en: "A third benefit is the ease of future upgrades. A self-built computer is easier to upgrade because you better understand how it works and can easily replace or add components. This makes your computer more flexible and ready for future changes and technological advancements.",
    },
    "pluses-6": {
        ua: "Збірка ПК також значно підвищує ваші знання про апаратну частину комп'ютера. Ви дізнаєтеся, як працюють різні компоненти та як вирішувати технічні проблеми. Ці цінні навички можуть стати в нагоді не тільки для особистого використання, але й у професійній сфері.",
        pl: "Składanie komputera znacząco zwiększa również Twoją wiedzę na temat sprzętu komputerowego. Dowiadujesz się, jak działają różne komponenty i jak rozwiązywać problemy techniczne. Te cenne umiejętności mogą przydać się nie tylko do użytku osobistego, ale również w sferze zawodowej.",
        en: "Building a PC also significantly increases your knowledge about computer hardware. You learn how different components work and how to troubleshoot technical issues. These valuable skills can be useful not only for personal use but also in a professional context.",
    },
    "pluses-7": {
        ua: "Крім того, збираючи комп'ютер самостійно, ви можете налаштувати його під свої індивідуальні потреби та вподобання. Ви можете обрати компоненти з певними характеристиками, додати специфічні функції або навіть створити унікальний дизайн корпусу.",
        pl: "Dodatkowo, składając komputer samodzielnie, możesz dostosować go do swoich indywidualnych potrzeb i preferencji. Możesz wybrać komponenty o określonych cechach, dodać specyficzne funkcje lub nawet stworzyć unikalny design obudowy.",
        en: "Moreover, by building your own computer, you can customize it to suit your individual needs and preferences. You can choose components with specific features, add unique functionalities, or even create a unique case design.",
    },
    "pluses-8": {
        ua: "Правильно обираючи компоненти, ви можете отримати вищу продуктивність за ті ж кошти, які витратили б на готову систему. Це дозволяє максимізувати продуктивність і ефективність вашого ПК відповідно до ваших потреб, будь то ігри, робота з графікою або програмування.",
        pl: "Właściwie dobierając komponenty, możesz uzyskać wyższą wydajność za te same pieniądze, które wydałbyś na gotowy system. Pozwala to zmaksymalizować wydajność i efektywność komputera zgodnie z Twoimi potrzebami, czy to w grach, pracy z grafiką czy programowaniu.",
        en: "By carefully selecting components, you can achieve higher performance for the same money you would spend on a pre-built system. This allows you to maximize the performance and efficiency of your computer according to your needs, whether it's gaming, graphic work, or programming.",
    },
    "pluses-9": {
        ua: "Нарешті, збірка комп'ютера – це захоплюючий процес, що приносить велике задоволення. Завершуючи цей проект, ви відчуваєте гордість за власноруч створений пристрій, що стає цінним досвідом і приємною частиною вашого хобі.",
        pl: "Na koniec, składanie komputera to fascynujący proces, który przynosi wielką satysfakcję. Ukończenie tego projektu daje poczucie dumy z własnoręcznie stworzonego urządzenia, co staje się cennym doświadczeniem i przyjemną częścią Twojego hobby.",
        en: "Finally, building a computer is an exciting process that brings great satisfaction. Completing this project gives you a sense of pride in the self-made device, becoming a valuable experience and an enjoyable part of your hobby.",
    },
    "pluses-10": {
        ua: "Збираючи комп'ютер вдома, ви створюєте пристрій, який ідеально відповідає вашим вимогам і бажанням, зекономивши кошти та здобувши нові корисні знання. Це не тільки практично, але й цікаво, надаючи вам більше контролю та гнучкості в майбутньому.",
        pl: "Składając komputer w domu, tworzysz urządzenie, które idealnie odpowiada Twoim wymaganiom i pragnieniom, oszczędzając pieniądze i zdobywając nowe, przydatne umiejętności. To nie tylko praktyczne, ale i interesujące, dając Ci więcej kontroli i elastyczności w przyszłości.",
        en: "By building a computer at home, you create a device that perfectly meets your needs and desires, saving money and gaining new useful knowledge. It's not only practical but also interesting, giving you more control and flexibility for the future.",
    },

    "procesor-1": {
        ua: "Початок збірки: вибір процесора",
        pl: "Początek składania: wybór procesora",
        en: "Starting the Build: Choosing a Processor",
    },
    "procesor-2": {
        ua: "Коли ви починаєте збирати свій комп'ютер, першим кроком зазвичай є вибір процесора (CPU). Це серце вашої системи, яке визначає її загальну продуктивність та можливості. Вибір правильного процесора залежить від того, для чого ви плануєте використовувати свій комп'ютер.",
        pl: "Kiedy zaczynasz składać swój komputer, pierwszym krokiem zazwyczaj jest wybór procesora (CPU). To serce twojego systemu, które określa jego ogólną wydajność i możliwości. Wybór odpowiedniego procesora zależy od tego, do czego planujesz używać swojego komputera.",
        en: "When you begin assembling your computer, the first step is usually choosing a processor (CPU). This is the heart of your system, determining its overall performance and capabilities. The right processor choice depends on what you plan to use your computer for.",
    },
    "procesor-3": {
        ua: "Головне правило при виборі процесора – пам’ятати, що більше 70% всіх процесорів – це марна та дорога фігня, яка хоче вас заплутати. Тому все це сміття ми зараз з вами відфільтруємо.",
        pl: "Główna zasada przy wyborze procesora – pamiętaj, że ponad 70% wszystkich procesorów to niepotrzebne i drogie gadżety, które chcą cię zmylić. Dlatego wszystkie te śmieci teraz z tobą odfiltrujemy.",
        en: "The main rule when choosing a processor is to remember that over 70% of all processors are unnecessary and expensive junk designed to confuse you. So let's filter out all that rubbish together now.",
    },
    "procesor-4": {
        ua: "Перше, у фільтрах при виборі процесора потрібно натиснути кількість ядер. І прямо зараз потрібно вирішити, скільки ядер вам потрібно. Мінімум, як для мене, це чарівних 4 ядра, якщо ви хочете просто грати в ігри, дивитися аніме тощо. Шість ядер – це оптимально для більш-менш комфортного стрімінгу, монтажу і так далі. Вісім ядер і більше – якщо ви збираєтеся навантажувати свій комп'ютер важкими та важливими задачами, як, наприклад, аеродинаміка корови в реальному часі. Тож обирайте та встановлюйте один варіант.  Але є трійка процесорів, які в жодному випадку брати НЕ можна – це Pentium, Athlon і Celeron.",
        pl: "Po pierwsze, w filtrach przy wyborze procesora trzeba kliknąć liczbę rdzeni. I właśnie teraz musisz zdecydować, ile rdzeni potrzebujesz. Minimum, według mnie, to magiczne 4 rdzenie, jeśli chcesz tylko grać w gry, oglądać anime itd. Sześć rdzeni – to optymalnie dla komfortowego streamowania, montażu i tym podobnych zadań. Osiem rdzeni i więcej – jeśli zamierzasz obciążać swój komputer ciężkimi i ważnymi zadaniami, na przykład symulacją aerodynamiki krowy w czasie rzeczywistym. Wybierz odpowiednią liczbę i ustaw filtr. Ale są trzy procesory, których NIE można brać w żadnym wypadku – to Pentium, Athlon i Celeron.",
        en: "First, in the filters when selecting a processor, you need to click on the number of cores. And right now, you need to decide how many cores you need. The minimum, in my opinion, is the magical 4 cores if you just want to play games, watch anime, etc. Six cores are optimal for somewhat comfortable streaming, editing, and so on. Eight cores or more are needed if you plan to load your computer with heavy and important tasks, such as real-time cow aerodynamics simulation. So choose and set one option. But there are three processors that you should NEVER choose – Pentium, Athlon, and Celeron.",
    },
    "procesor-5": {
        ua: "Далі у фільтрах треба натиснути «багатопоточність», тому що з багатопоточністю потоків буде більше, ніж без неї, а це дуже добре. Потім у фільтрах інтегроване графічне ядро треба натиснути «НІ», тому що процесори без внутрішньої відеокарти коштують дешевше, але якщо ви спеціально обираєте комп'ютер без відеокарти, то процесор без графіки залишить вас без графіки. Тому бажано взяти процесор із графікою.",
        pl: "Dalej, w filtrach trzeba kliknąć „wielowątkowość”, bo wielowątkowość oznacza więcej wątków, a to bardzo dobrze. Potem w filtrach zintegrowane rdzenie graficzne wybierz „NIE”, bo procesory bez wewnętrznej karty graficznej są tańsze, ale jeśli specjalnie wybierasz komputer bez karty graficznej, to procesor bez grafiki zostawi cię bez grafiki. Dlatego najlepiej wybrać procesor z grafiką.",
        en: "Next, in the filters, you need to click on 'multithreading' because multithreading means more threads, and that's very good. Then, in the integrated graphics core filter, select 'NO' because processors without an internal graphics card are cheaper, but if you are specifically choosing a computer without a graphics card, then a processor without graphics will leave you without graphics. So it's better to get a processor with graphics.",
    },
    "procesor-6": {
        ua: "Далі у фільтрах треба поставити «вік» не старший трьох років, бо старі процесори занадто старі, а ми з вами молоді та красиві. І тепер, зважаючи на ці фільтри, процесорів залишилося набагато менше, ніж було спочатку. Але як же обрати тільки один з них? Виставляйте процесори від найдешевших до найдорожчих. Ціни постійно змінюються, то вниз, то вгору. Якщо ви обрали чотири ядра чи шість, на вибір буде приблизно 3-4 моделі. Але ви запитаєте, чому тут дві моделі одного того ж процесора? Що за безпорядок? ",
        pl: "Następnie w filtrach ustaw „wiek” nie starszy niż trzy lata, bo stare procesory są zbyt stare, a my jesteśmy młodzi i piękni. I teraz, z tymi filtrami, procesorów jest znacznie mniej niż na początku. Ale jak wybrać ten jeden? Ustaw procesory od najtańszych do najdroższych. Ceny stale się zmieniają, to w dół, to w górę. Jeśli wybrałeś cztery rdzenie lub sześć, do wyboru będzie około 3-4 modeli. Ale dlaczego są dwie wersje tego samego procesora? Co za bałagan?",
        en: "Next, in the filters, set the 'age' to no older than three years because old processors are too old, and we are young and beautiful. And now, with these filters, there are much fewer processors than there were initially. But how do you choose just one? Sort the processors from the cheapest to the most expensive. Prices constantly fluctuate, up and down. If you chose four or six cores, there will be about 3-4 models to choose from. But you might ask, why are there two models of the same processor? What a mess!",
    },
    "procesor-7": {
        ua: "Є BOX версія для поціновувачів боксу (спортивна) та OEM версія для решти. Вони абсолютно однакові, тільки в BOX версіях є коробка, якісь папірці, додаткова гарантія і кулер. Але його не завжди кладуть, це можна уточнити в характеристиках. В OEM версіях немає взагалі нічого, тільки сам процесор, запакований невідомо як. Так що ж брати? Дивіться на різницю в ціні, у Intel вона невелика, а у AMD буває досить відчутною. Так от, якщо в BOX-версії точно є кулер і вона не набагато дорожча, то можна її взяти. ",
        pl: "Jest wersja BOX dla miłośników boksu (sportowa) i wersja OEM dla reszty. Są absolutnie identyczne, tylko w wersjach BOX jest pudełko, jakieś papiery, dodatkowa gwarancja i cooler. Ale nie zawsze go dodają, można to sprawdzić w specyfikacjach. W wersjach OEM nie ma nic, tylko sam procesor, zapakowany nie wiadomo jak. Więc co wybrać? Patrz na różnicę w cenie, u Intela jest niewielka, a u AMD może być dość znacząca. Jeśli w wersji BOX na pewno jest cooler i nie jest dużo droższa, można ją wziąć.",
        en: "There is the BOX version for boxing enthusiasts (sporty) and the OEM version for everyone else. They are absolutely identical, except the BOX versions come with a box, some papers, additional warranty, and a cooler. But the cooler is not always included, which can be checked in the specs. The OEM versions come with nothing, just the processor itself, packed who knows how. So which one to choose? Look at the price difference; with Intel, it’s small, but with AMD, it can be quite significant. If the BOX version definitely includes a cooler and isn’t much more expensive, it’s worth considering.",
    },
    "procesor-8": {
        ua: "Повернемося до вибору процесора: вам треба порівняти тести цих процесорів у найновіших іграх із трьох різних джерел. На YouTube знайдіть порівняння цих процесорів попарно, і вам одразу висвітляться десятки тестів.",
        pl: "Wracając do wyboru procesora: trzeba porównać testy tych procesorów w najnowszych grach z trzech różnych źródeł. Na YouTube znajdź porównania tych procesorów parami, i od razu pojawią się dziesiątki testów.",
        en: "Returning to choosing a processor: you need to compare the tests of these processors in the latest games from three different sources. On YouTube, find comparisons of these processors in pairs, and you will immediately see dozens of tests.",
    },
    "procesor-9": {
        ua: "І останнє, що треба сказати про процесори – це їхня абетка. Літера “К” в процесорах Intel означає, що процесор трохи потужніший і його можна розігнати. За нашими фільтрами ви зустрінете процесори не “K”, а “KF” – це те саме, тільки без графіки. Що стосується процесорів AMD, вони всі в основному можуть бути розігнані без спеціальної літери. Але материнські плати для розгону процесорів будуть дорожчими за звичайні.",
        pl: "I na koniec, co trzeba powiedzieć o procesorach – to ich oznaczenia. Litera „K” w procesorach Intel oznacza, że procesor jest trochę mocniejszy i można go podkręcić. Zgodnie z naszymi filtrami napotkasz procesory nie „K”, a „KF” – to samo, tylko bez grafiki. Jeśli chodzi o procesory AMD, wszystkie one głównie można podkręcać bez specjalnej litery. Ale płyty główne do podkręcania procesorów będą droższe niż zwykłe.",
        en: "Finally, regarding processors – their alphabet. The letter “K” in Intel processors means the processor is slightly more powerful and can be overclocked. According to our filters, you will encounter processors not marked with “K” but “KF” – which is the same, just without graphics. As for AMD processors, most of them can be overclocked without a special letter. However, motherboards for overclocking processors will be more expensive than regular ones.",
    },

    "kuler-1": {
        ua: "Як підібрати кулер для процесора",
        pl: "Jak dobrać chłodzenie do procesora",
        en: "How to Choose a CPU Cooler",
    },
    "kuler-2": {
        ua: "Кулер/ВЖУХ-ВЖУХ",
        pl: "Chłodzenie/WŻUCH-WŻUCH",
        en: "Cooler/WHOOOSH-WHOOOSH",
    },
    "kuler-3": {
        ua: "Якщо ви обрали процесор, то кулер вам обов’язково знадобиться. А для чого він потрібен? Бо будь який процесор дуже гарячий та під час роботи виділяє багато тепла, і щоб уникнути перегріву, необхідно його охолоджувати.",
        pl: "Jeśli wybrałeś procesor, chłodzenie będzie Ci absolutnie niezbędne. Dlaczego? Każdy procesor bardzo się nagrzewa i w trakcie pracy wydziela dużo ciepła, a aby uniknąć przegrzania, konieczne jest jego chłodzenie.",
        en: "If you have chosen a processor, you definitely need a cooler. Why? Because any processor gets very hot and generates a lot of heat during operation, and to avoid overheating, it needs to be cooled.",
    },
    "kuler-4": {
        ua: "Обираємо кулер",
        pl: "Wybór chłodzenia",
        en: "Choosing a Cooler",
    },
    "kuler-5": {
        ua: "Характеристик у ньго більше чим достатньо: 'Гарантія 6 місяців', 'Країна виготовлення Китай' і так далі… При виборі кулера варто звернути увагу на кілька ключових характеристик:",
        pl: "Charakterystyk jest więcej niż wystarczająco: 'Gwarancja 6 miesięcy', 'Kraj produkcji: Chiny' i tak dalej... Przy wyborze chłodzenia warto zwrócić uwagę na kilka kluczowych cech:",
        en: "There are more than enough characteristics: '6-month warranty,' 'Manufactured in China,' and so on... When choosing a cooler, pay attention to a few key features:",
    },
    "kuler-6": {
        ua: "Регулювання швидкості обертів:",
        pl: "Regulacja prędkości obrotów:",
        en: "Fan Speed Control:",
    },
    "kuler-7": {
        ua: "Вибирайте автоматичне регулювання швидкості обертів. Це дозволить кулеру самостійно підлаштовуватися під навантаження: сильно крутитись коли гаряче і не дуже сильно коли не гаряче. ",
        pl: "Wybieraj chłodzenie z automatyczną regulacją prędkości obrotów. Pozwoli to chłodzeniu dostosowywać się do obciążenia: kręcić się mocniej, gdy jest gorąco i słabiej, gdy nie jest gorąco.",
        en: "Choose a cooler with automatic fan speed control. This will allow the cooler to adjust to the load: spin fast when it's hot and slow down when it's not.",
    },
    "kuler-8": {
        ua: "Сокет процесора:",
        pl: "Socket procesora:",
        en: "CPU Socket:",
    },
    "kuler-9": {
        ua: "Важливо, щоб кулер був сумісний з сокетом вашого процесора. Наприклад, якщо у вас сокет 'LGA 1200', переконайтеся, що кулер підтримує цей сокет.",
        pl: "Ważne jest, aby chłodzenie było kompatybilne z socketem twojego procesora. Na przykład, jeśli masz socket 'LGA 1200', upewnij się, że chłodzenie obsługuje ten socket.",
        en: "It is important that the cooler is compatible with your CPU socket. For example, if you have an 'LGA 1200' socket, make sure the cooler supports this socket.",
    },
    "kuler-10": {
        ua: "Максимальний TDP (тепловиділення):",
        pl: "Maksymalne TDP (wydzielanie ciepła):",
        en: "Maximum TDP (Thermal Design Power):",
    },
    "kuler-11": {
        ua: "Перевірте тепловиділення вашого процесора (наприклад, 65 Вт). У фільтрах кулера введіть максимальний TDP, помножений на 1.5-2 рази. Це необхідно, тому що заявлені характеристики кулера можуть трохи відрізнятися від реальності. Чим потужніший кулер, тим менше він буде напружуватися, а отже, менше шумітиме, що завжди приємно.",
        pl: "Sprawdź wydzielanie ciepła swojego procesora (na przykład, 65 W). W filtrach chłodzenia wprowadź maksymalne TDP, pomnożone przez 1,5-2 razy. Jest to konieczne, ponieważ deklarowane cechy chłodzenia mogą nieznacznie różnić się od rzeczywistości. Im mocniejsze chłodzenie, tym mniej będzie się napinać, a więc będzie cichsze, co zawsze jest przyjemne.",
        en: "Check the TDP of your processor (e.g., 65W). In the cooler filters, enter the maximum TDP multiplied by 1.5-2 times. This is necessary because the stated characteristics of the cooler may differ slightly from reality. The more powerful the cooler, the less it will have to strain, and therefore it will be quieter, which is always pleasant.",
    },
    "kuler-12": {
        ua: "Після цього магазин покаже вам безліч варіантів кулерів. Тут важливо керуватися власним смаком та відгуками реальних користувачів. Обирайте будь-який кулер, який вам сподобається, з підсвіткою чи без, з розфарбованими лопатями чи без них. І якщо скарг на нього, буде не сильно багато, сміливо беріть його.",
        pl: "Po tym, sklep pokaże Ci wiele opcji chłodzenia. Ważne jest, aby kierować się własnym gustem oraz opiniami prawdziwych użytkowników. Wybierz dowolne chłodzenie, które Ci się podoba, z podświetleniem lub bez, z kolorowymi łopatkami lub bez nich. Jeśli nie ma na niego zbyt wielu skarg, śmiało go bierz.",
        en: "After this, the store will show you many cooler options. It is important to rely on your own taste and real user reviews. Choose any cooler that you like, with or without lighting, with painted blades or not. If there aren't too many complaints about it, feel free to take it.",
    },

    "motherboard-1": {
        ua: "Як підібрати материнську плату",
        pl: "Jak dobrać płytę główną",
        en: "How to Choose a Motherboard",
    },
    "motherboard-2": {
        ua: "Говорять, матір не вибирають, але ще як вибирають. У покупців завжди є одна умова: щоб не здохла, тому давайте обирати.",
        pl: "",
        en: "They say you don't choose your mother, but in this case, you do. Customers always have one condition: it shouldn’t die, so let’s make a good choice.",
    },
    "motherboard-3": {
        ua: "Звичайно, сокет вашого процесора і сокет материнської плати повинні співпадати. А ось далі у фільтрі чипсет з’явиться багато незрозумілого. Кажуть, що це найскладніша частина вибору вашої материнської плати, але не напружуйтеся і читайте далі, як правильно обирати чипсет.",
        pl: "Oczywiście, socket Twojego procesora i socket płyty głównej muszą się zgadzać. W filtrze chipset pojawi się wiele niezrozumiałych rzeczy. Mówią, że to najtrudniejsza część wyboru płyty głównej, ale nie martw się i czytaj dalej, jak prawidłowo wybrać chipset.",
        en: "Of course, the socket of your processor and the socket of the motherboard must match. In the chipset filter, a lot of confusing options will appear. They say this is the hardest part of choosing your motherboard, but don’t stress and read on to learn how to choose a chipset correctly.",
    },
    "motherboard-4": {
        ua: "Якщо ви взяли процесор Intel з літерою просто 'F' в кінці, то вам потрібен чипсет з літерами 'H' або 'B' на початку. Якщо ж ви взяли процесор Intel з літерами 'KF' в кінці, то вам потрібен чипсет з літерою 'Z' на початку. На них можна робити розгін, а на інших не можна. Якщо ж ви взяли процесор Ryzen, то вам потрібен чипсет з літерами 'B' або 'X' на початку, звичайно AMD. На них теж можна робити розгін, а ось на інших не можна.",
        pl: "Jeśli masz procesor Intel z literą 'F' na końcu, to potrzebujesz chipsetu z literami 'H' lub 'B' na początku. Jeśli masz procesor Intel z literami 'KF' na końcu, to potrzebujesz chipsetu z literą 'Z' na początku. Na nich można podkręcać, na innych nie. Jeśli masz procesor Ryzen, to potrzebujesz chipsetu z literami 'B' lub 'X' na początku, oczywiście AMD. Na nich również można podkręcać, na innych nie.",
        en: "If you have an Intel processor with just the letter 'F' at the end, then you need a chipset with the letters 'H' or 'B' at the beginning. If you have an Intel processor with the letters 'KF' at the end, then you need a chipset with the letter 'Z' at the beginning. These allow overclocking, others do not. If you have a Ryzen processor, you need a chipset with the letters 'B' or 'X' at the beginning, of course, AMD. These also allow overclocking, while others do not.",
    },
    "motherboard-5": {
        ua: "Чипсети відрізняються різними функціями, з якими ви завжди зможете легко ознайомитися в статті на Вікіпедії про ваш сокет. Однак, набагато важливішими є живлення та сумісність. Тобто коли ви спробуєте встановити процесор, а висунути вже ні. Перше, що треба зробити – переконатися, що ваша материнська плата підтримує ваш процесор. На офіційному сайті материнської плати завжди буде написано, які покоління процесорів вона підтримує.",
        pl: "Chipsety różnią się różnymi funkcjami, z którymi zawsze możesz łatwo zapoznać się w artykule na Wikipedii o Twoim socket. Jednak o wiele ważniejsze są zasilanie i kompatybilność. Czyli, gdy próbujesz zamontować procesor, ale nie możesz go wyjąć. Pierwsze, co musisz zrobić, to upewnić się, że Twoja płyta główna obsługuje Twój procesor. Na oficjalnej stronie płyty głównej zawsze będzie napisane, które generacje procesorów obsługuje.",
        en: "Chipsets differ in various functions, which you can easily read about in a Wikipedia article about your socket. However, much more important are power and compatibility. Meaning, when you try to install the processor but can’t remove it. The first thing to do is make sure your motherboard supports your processor. On the official website of the motherboard, it will always say which generations of processors it supports.",
    },
    "motherboard-6": {
        ua: "І остання штука при виборі материнської плати – це живлення та його охолодження. Це важлива та міцна тема, як туалетний папір 'Обухів'. Але так, щоб зрозумів кожен. Якщо ядер у процесора багато і ви плануєте його розганяти, то потрібно, щоб на материнській платі було більше маленьких Баночок-Коробочок (тих що на зображенні), короче конденсаторів і щоб їх прикривав радіатор. Якщо ядер не дуже багато і розганяти процесор ви не збираєтеся, то особливої різниці немає, але бажано, щоб їх було більше 1-2-3-х і був радіатор – це було б чудово.",
        pl: "I ostatnia rzecz przy wyborze płyty głównej to zasilanie i jego chłodzenie. To ważny i mocny temat jak papier toaletowy. Ale tak, żeby każdy zrozumiał. Jeśli procesor ma wiele rdzeni i planujesz go podkręcać, to płyta główna powinna mieć więcej małych 'Puszek-Pudełek' (tych na zdjęciu), czyli kondensatorów, i powinny być one pokryte radiatorem. Jeśli rdzeni nie jest zbyt wiele i nie zamierzasz podkręcać procesora, to nie ma większej różnicy, ale dobrze by było, gdyby było ich więcej niż 1-2-3 i był radiator – to byłoby super.",
        en: "And the last thing when choosing a motherboard is power and its cooling. This is an important and solid topic, like toilet paper. But to make it understandable for everyone: if your processor has many cores and you plan to overclock it, the motherboard should have more small 'Cans-Boxes' (the ones in the picture), in short, capacitors, and they should be covered by a heatsink. If there aren’t many cores and you don’t plan to overclock the processor, there isn’t much difference, but it would be good to have more than 1-2-3 and have a heatsink – that would be great.",
    },
    "motherboard-7": {
        ua: "Тепер, коли ви встановили ці фільтри, сортуйте материнські плати від дешевих до дорогих. І читайте у відгуках, по-перше, як часто зустрічається брак, по-друге, про які мінуси пишуть люди. Наприклад, на платі немає можливості підключити RGB або ARGB підсвітку, немає вбудованого Wi-Fi, відсутній роз’єм M.2 для вашого SSD. Вам це може бути абсолютно байдуже, а може він у вас від попереднього комп’ютера залишився. Висока ціна на материнську плату, на жаль, не є гарантом її якості. Ідеальних плат не існує, але прагнучих до ідеалу навіть серед найдешевших плат достатньо. Ви це побачите по відгуках покупців і обов’язково знайдете свою.",
        pl: "Teraz, gdy ustawiłeś te filtry, sortuj płyty główne od najtańszych do najdroższych. I czytaj w opiniach, po pierwsze, jak często występują wady, po drugie, jakie minusy piszą ludzie. Na przykład, płyta nie ma możliwości podłączenia podświetlenia RGB lub ARGB, nie ma wbudowanego Wi-Fi, brak gniazda M.2 dla Twojego SSD. Może Ci to być obojętne, a może masz go z poprzedniego komputera. Wysoka cena płyty głównej niestety nie jest gwarancją jej jakości. Idealnych płyt nie ma, ale dążących do ideału nawet wśród najtańszych jest wystarczająco. Zobaczysz to w opiniach kupujących i na pewno znajdziesz swoją.",
        en: "Now, after applying these filters, sort motherboards from the cheapest to the most expensive. And read the reviews, first, how often defects occur, and second, what negatives people mention. For example, the board may not support RGB or ARGB lighting, lack built-in Wi-Fi, or miss an M.2 slot for your SSD. This might be totally irrelevant to you, or maybe you have one from a previous computer. High price, unfortunately, is not a guarantee of quality. Perfect boards don’t exist, but there are plenty aiming for perfection even among the cheapest. You’ll see this from customer reviews and you’ll definitely find your match.",
    },
    "motherboard-8": {
        ua: "Не бійтесь обирати, все буде добре.",
        pl: "Nie bój się wybierać, wszystko będzie dobrze.",
        en: "Don’t be afraid to choose, everything will be fine.",
    },

    "ram-1": {
        ua: "Як підібрати оперативну пам'ять RAM",
        pl: "Jak dobrać pamięć RAM",
        en: "How to Choose RAM",
    },
    "ram-2": {
        ua: "І так, оперативна пам’ять. Обирайте у фільтрах DIMM, тип пам’яті обирайте той, який підтримує ваша материнська плата (це може бути DDR4, DDR5, DDR6). В характеристиках плати це завжди написано. Кількість модулів в комплекті рекомендую брати два, навіть якщо материнська плата підтримує чотири, тому що в майбутньому ви зможете додати ще два, якщо це знадобиться. Далі, сумарний обсяг пам’яті повинен бути мінімум 16 ГБ, але чим більше, тим краще.",
        pl: "A więc, pamięć RAM. Wybierz w filtrach DIMM, typ pamięci wybierz taki, który obsługuje twoja płyta główna (to może być DDR4, DDR5, DDR6). W specyfikacji płyty głównej zawsze to jest napisane. Liczbę modułów w zestawie zalecam brać dwa, nawet jeśli płyta główna obsługuje cztery, ponieważ w przyszłości będziesz mógł dodać jeszcze dwa, jeśli zajdzie taka potrzeba. Następnie, całkowita pojemność pamięci powinna wynosić minimum 16 GB, ale im więcej, tym lepiej.",
        en: "So, RAM. Select DIMM in the filters, choose the type of memory supported by your motherboard (it could be DDR4, DDR5, DDR6). This is always listed in the motherboard specifications. I recommend choosing two memory modules even if the motherboard supports four because you can add two more in the future if needed. Next, the total memory capacity should be at least 16 GB, but the more, the better.",
    },
    "ram-3": {
        ua: "Тактова частота теж має значення: чим вища, тим краща. Але якщо говорити про конкретні цифри, то мінімально беруть ту частоту, яка офіційно підтримується вашим процесором як максимально стабільна. Пам’ять може працювати і на вищих частотах, але ті цифри гарантують, що система працюватиме стабільно. Тому з цими фільтрами виставляйте від найдешевшої моделі і обирайте.",
        pl: "Częstotliwość taktowania również ma znaczenie: im wyższa, tym lepsza. Ale jeśli chodzi o konkretne liczby, to minimalnie bierz tę częstotliwość, którą oficjalnie obsługuje twój procesor jako maksymalnie stabilną. Pamięć może działać na wyższych częstotliwościach, ale te liczby gwarantują, że system będzie działał stabilnie. Dlatego ustaw te filtry, posortuj od najtańszych modeli i wybieraj.",
        en: "Clock speed also matters: the higher, the better. But when talking about specific numbers, take at least the frequency that your processor officially supports as maximally stable. Memory can operate at higher frequencies, but those numbers guarantee that the system will work stably. So, apply these filters, sort from the cheapest models, and choose.",
    },
    "ram-4": {
        ua: "Таймінги, ранговість та інші складні терміни не хвилюють більшість початківців, оскільки вони орієнтуються на відгуки реальних покупців і абсолютно правильно роблять. Найчастіша скарга від покупців – це поганий розгін та нестабільний XMP. Тому якщо ви таких відгуків зустрінете небагато, то можете сміливо купувати цю оперативну пам’ять.",
        pl: "Timingi, liczba rang i inne skomplikowane terminy nie martwią większości początkujących, ponieważ kierują się oni opiniami rzeczywistych klientów i mają absolutną rację. Najczęstsza skarga klientów to słabe możliwości podkręcania i niestabilny XMP. Dlatego jeśli znajdziesz niewiele takich opinii, możesz śmiało kupić tę pamięć RAM.",
        en: "Timings, ranks, and other complex terms do not concern most beginners, as they rely on reviews from real customers, which is absolutely correct. The most common complaint from customers is poor overclocking potential and unstable XMP. So, if you encounter few such reviews, you can safely buy that RAM.",
    },

    "dysk-1": {
        ua: "Як підібрати жорсткий накопичувач",
        pl: "Jak dobrać dysk twardy",
        en: "How to Choose a Hard Drive",
    },
    "dysk-2": {
        ua: "Чим жорсткий диск жорсткіший, тим краще. Обирайте жорсткий диск формату 3.5 дюйма, зі швидкістю відвалу шпинделя від 200 обертів на хвилину і більше, обсяг кеш-пам’яті від 64 МБ і більше. Обсяг самого диска розраховується за формулою (довжина диска помножена на ширину диска і помножена на висоту диска), але зазвичай беріть від одного терабайта пам’яті і більше. Також рекомендую уникати черепичних SMR дисків.",
        pl: "Im twardszy dysk twardy, tym lepiej. Wybierz dysk twardy o formacie 3.5 cala, z prędkością obrotową od 200 obrotów na minutę i więcej, oraz z pamięcią podręczną od 64 MB i więcej. Pojemność samego dysku oblicza się według wzoru (długość dysku pomnożona przez szerokość dysku i pomnożona przez wysokość dysku), ale zazwyczaj wybieraj dysk o pojemności co najmniej jednego terabajta. Zalecam również unikanie dysków SMR (Shingled Magnetic Recording).",
        en: "The harder the hard drive, the better. Choose a 3.5-inch hard drive with a spindle speed of 200 RPM or higher and a cache size of 64 MB or more. The capacity of the drive itself is calculated using the formula (length of the drive multiplied by the width of the drive and multiplied by the height of the drive), but usually, you should opt for a drive with at least one terabyte of storage. I also recommend avoiding SMR (Shingled Magnetic Recording) drives.",
    },
    "dysk-3": {
        ua: "SSD ви можете обрати формату 2.5 дюйма або формату M.2, по ціні вони приблизно однакові. Для підключення SSD M.2 на материнській платі потрібен спеціальний роз’єм, але у нього зазвичай вищі показники швидкості читання та запису. В цілому, різниця у FPS в іграх між цими форматами незначна, тому особисто для мене це не важливо. Мінімальний обсяг накопичувача повинен бути 240 ГБ. Якщо ви обираєте дешевий накопичувач, звертайте увагу на кількість скарг – обирайте той, який має найменше негативних відгуків.",
        pl: "SSD możesz wybrać w formacie 2.5 cala lub formacie M.2, ich cena jest zazwyczaj podobna. Aby podłączyć SSD M.2, na płycie głównej potrzebne jest specjalne złącze, ale ten typ SSD zazwyczaj oferuje wyższe prędkości odczytu i zapisu. Ogólnie rzecz biorąc, różnica w FPS w grach między tymi formatami jest niewielka, więc dla mnie osobiście nie ma to większego znaczenia. Minimalna pojemność dysku powinna wynosić 240 GB. Jeśli wybierasz tani dysk, zwracaj uwagę na liczbę skarg – wybieraj ten, który ma najmniej negatywnych opinii.",
        en: "You can choose an SSD in either 2.5-inch format or M.2 format; their prices are generally similar. To connect an M.2 SSD, a special slot is required on the motherboard, but M.2 SSDs typically offer higher read and write speeds. Overall, the difference in FPS in games between these formats is minimal, so it doesn't matter much to me personally. The minimum storage capacity should be 240 GB. If you are choosing a cheaper drive, pay attention to the number of complaints – choose the one with the least negative reviews.",
    },

    "grafika-1": {
        ua: "Як підібрати відеокарту",
        pl: "Jak dobrać kartę graficzną",
        en: "How to Choose a Graphics Card",
    },
    "grafika-2": {
        ua: "Обирати відеокарту насправді дуже просто. Існує безліч тестів, оглядів та порівнянь FPS на YouTube, тому люди зазвичай не сумніваються у виборі конкретної моделі відеокарти, яку вони хочуть придбати. Проблеми можуть виникнути при виборі виробника. Так від якої саме компанії взяти? Питання просто неймовірне, скажу я вам, тут без пів літра не розберешся. Тому що у кожної компанії є як хороші, так і погані варіанти. Головне — не купувати відеокарти Noname з AliExpress.",
        pl: "Wybór karty graficznej jest w rzeczywistości bardzo prosty. Istnieje mnóstwo testów, recenzji i porównań FPS na YouTube, więc ludzie zazwyczaj nie mają wątpliwości co do konkretnego modelu karty graficznej, który chcą kupić. Problemy mogą pojawić się przy wyborze producenta. Z jakiej firmy wziąć? Pytanie to jest po prostu niewiarygodne, powiem wam, tu bez pół litra nie da się tego rozwiązać. Ponieważ każda firma ma zarówno dobre, jak i złe warianty. Najważniejsze - nie kupować kart graficznych Noname z AliExpress.",
        en: "Choosing a graphics card is actually very simple. There are plenty of tests, reviews, and FPS comparisons on YouTube, so people usually have no doubts about the specific model of the graphics card they want to buy. The problems can arise when choosing the manufacturer. Which company to go for? This question is simply incredible, let me tell you, it's something you can't figure out without a drink. Because each company has both good and bad options. The main thing is not to buy Noname graphics cards from AliExpress.",
    },
    "grafika-3": {
        ua: "Щодо конструкції: чим більше вентиляторів і чим товстіший радіатор, тим тиха і прохолодна відеокарта. Якщо TDP відеокарти менше 125 Вт, то і один вентилятор на ній повинен, я б навіть сказав мусить справлятись охолодженням.",
        pl: "Jeśli chodzi o konstrukcję: im więcej wentylatorów i im grubszy radiator, tym cichsza i chłodniejsza karta graficzna. Jeśli TDP karty graficznej jest mniejsze niż 125 W, to jeden wentylator powinien, a nawet musi poradzić sobie z chłodzeniem.",
        en: "As for the construction: the more fans and the thicker the radiator, the quieter and cooler the graphics card will be. If the TDP of the graphics card is less than 125 W, then one fan should, I would even say must, handle the cooling.",
    },
    "grafika-4": {
        ua: "У плані звуку від відеокарт можна почути професійний бітбокс: вони можуть скрипіти, пищати і свистіти, навіть дорогі моделі. Якщо в відгуках чи оглядах ви кілька разів наткнетеся на слова «тріск», «свист», «писк», «пиписк», то краще цю модель не купувати.",
        pl: "Pod względem dźwięku od karty graficznej można usłyszeć profesjonalny beatbox: mogą skrzypieć, piszczeć i gwizdać, nawet drogie modele. Jeśli w opiniach lub recenzjach kilkakrotnie napotkasz słowa „trzask”, „gwizd”, „piszczenie”, „pipisk”, lepiej nie kupować tego modelu.",
        en: "In terms of sound, graphics cards can perform professional beatboxing: they can creak, squeak, and whistle, even expensive models. If in the reviews or reviews you come across the words 'crackle', 'whistle', 'squeak', 'pipisk' several times, it's better not to buy this model.",
    },
    "grafika-5": {
        ua: "Якщо карти виглядають однаково, коштують однаково і мають однакові плюси та мінуси, обирайте ту, у якої вища частота. Розігнані з заводу карти називають ще OC. Пам’ятайте, зовнішній вигляд відеокарти не так важливий, бо вона буде дивитися вниз. Головне — як виглядає підключення живлення.",
        pl: "Jeśli karty wyglądają tak samo, kosztują tyle samo i mają te same zalety i wady, wybierz tę, która ma wyższe częstotliwości. Karty przetaktowane z fabryki nazywają się również OC. Pamiętaj, wygląd karty graficznej nie jest tak ważny, bo będzie patrzeć w dół. Najważniejsze - jak wygląda podłączenie zasilania.",
        en: "If the cards look the same, cost the same, and have the same pros and cons, choose the one with the higher frequency. Factory overclocked cards are also called OC. Remember, the appearance of the graphics card is not so important because it will be facing down. The main thing is how the power connection looks.",
    },
    "grafika-6": {
        ua: "Обирайте відеокарту спокійно, і все буде добре, дорогенькі.",
        pl: "Wybierz kartę graficzną spokojnie, i wszystko będzie dobrze, drodzy.",
        en: "Choose a graphics card calmly, and everything will be fine, dear ones.",
    },
    

    "blok-1": {
        ua: "Блок живлення",
        pl: "Zasilacz",
        en: "Power Supply Unit (PSU)",
    },
    "blok-2": {
        ua: "Для початку треба дізнатися, скільки вашій системі необхідно потужності. Зайдіть на будь-який калькулятор потужності і заповніть його тими комплектуючими, які ви обрали. Єдине, що ви можливо не знаєте, – це кількість вентиляторів, тому поставте чотири. Тепер, коли ви знаєте, скільки споживає ваша система, додайте сотню, щоб при апгрейді не замінювати блок живлення ще раз.",
        pl: "Na początek musisz dowiedzieć się, ile mocy potrzebuje twój system. Wejdź na dowolny kalkulator mocy i wypełnij go wybranymi przez siebie komponentami. Jedyna rzecz, której możesz nie znać, to liczba wentylatorów, więc ustaw cztery. Teraz, gdy wiesz, ile mocy zużywa twój system, dodaj sto watów, aby nie musieć wymieniać zasilacza podczas modernizacji.",
        en: "First, you need to find out how much power your system needs. Go to any power calculator and fill it out with the components you have chosen. The only thing you might not know is the number of fans, so set it to four. Now that you know how much power your system consumes, add a hundred watts so that you don’t have to replace the power supply again during an upgrade.",
    },
    "blok-3": {
        ua: "Обов’язкові умови:",
        pl: "Obowiązkowe warunki:",
        en: "Mandatory conditions:",
    },
    "blok-4": {
        ua: "У БЖ повинен бути роз’єм для повного живлення вашої відеокарти. Ця інформація вказана в характеристиках відеокарти у розділі «Додаткові роз’єми живлення» (наприклад: 8-pin), а у блоку живлення – у розділі «Роз’єми для живлення відеокарти (PCI-E)».",
        pl: "Zasilacz musi mieć złącze do pełnego zasilania twojej karty graficznej. Informacje te znajdują się w specyfikacjach karty graficznej w sekcji „Dodatkowe złącza zasilania” (np. 8-pin), a w zasilaczu – w sekcji „Złącza zasilania karty graficznej (PCI-E)”.",
        en: "The PSU must have a connector for fully powering your graphics card. This information is specified in the graphics card specifications under the 'Additional Power Connectors' section (e.g., 8-pin), and in the PSU under the 'PCI-E Power Connectors' section.",
    },
    "blok-5": {
        ua: "У БЖ повинен бути роз’єм для живлення вашого процесора. Ця інформація вказана в характеристиках материнської плати у розділі «Роз’єм живлення процесора» (наприклад: 8-pin), а у блоку живлення – у розділі «Роз’єми для живлення процесора (CPU)».",
        pl: "Zasilacz musi mieć złącze do zasilania twojego procesora. Informacje te znajdują się w specyfikacjach płyty głównej w sekcji „Złącze zasilania procesora” (np. 8-pin), a w zasilaczu – w sekcji „Złącza zasilania procesora (CPU)”.",
        en: "The PSU must have a connector for powering your processor. This information is specified in the motherboard specifications under the 'CPU Power Connector' section (e.g., 8-pin), and in the PSU under the 'CPU Power Connectors' section.",
    },
    "blok-6": {
        ua: "У БЖ повинно бути достатньо роз’ємів SATA для живлення ваших жорстких дисків і SSD.",
        pl: "Zasilacz musi mieć wystarczającą liczbę złączy SATA do zasilania twoich dysków twardych i SSD.",
        en: "The PSU must have enough SATA connectors to power your hard drives and SSDs.",
    },
    "blok-7": {
        ua: "У кожної компанії є погані блоки живлення, тому я залишу таблицю нормальних блоків живлення за посиланням ",
        pl: "Każda firma ma złe zasilacze, dlatego zostawiam tabelę normalnych zasilaczy pod tym linkiem ",
        en: "Every company has bad power supplies, so I'm leaving a table of good PSUs at this link ",
    },
    "blok-8": {
        ua: "Tам багато інформації про БЖ, але там немає інформації про довжину та зовнішній вигляд кабелів. Пояснюю: короткі шнури БЖ можуть не дозволити вам під час складання ПК провести їх через задню стінку корпусу для акуратної збірки. У багатьох БЖ наконечники шнурів кольорові, і виглядає це неестетично по колхозькі. Є, звісно, і повністю чорні наконечники, вони часто зустрічаються серед модульних БЖ, ті, в яких кожен шнур можна підключити чи відключити окремо. Щоб уникнути проблеми з кольоровими наконечниками, дивіться на фото в магазині, а щодо довжини – читайте відгуки, бо скарги на це досить часті. Простим рішенням проблеми може бути покупка подовжувача в обплетенні.",
        pl: "Jest tam dużo informacji o zasilaczach, ale nie ma informacji o długości i wyglądzie kabli. Wyjaśniam: krótkie przewody zasilacza mogą uniemożliwić ci ich przeprowadzenie przez tylną ściankę obudowy podczas składania komputera w estetyczny sposób. W wielu zasilaczach końcówki przewodów są kolorowe, co wygląda nieestetycznie, jak na wiejskiej zabawie. Oczywiście są też całkowicie czarne końcówki, które często występują w modularnych zasilaczach, gdzie każdy przewód można podłączyć lub odłączyć osobno. Aby uniknąć problemu z kolorowymi końcówkami, spójrz na zdjęcia w sklepie, a jeśli chodzi o długość – przeczytaj opinie, ponieważ skargi na to są dość częste. Prostym rozwiązaniem problemu może być zakup przedłużacza w oplocie.",
        en: "There's a lot of information about PSUs, but it doesn't include the length and appearance of the cables. Let me explain: short PSU cables might prevent you from routing them through the back of the case for a clean build. Many PSUs have colorful cable ends, which looks unaesthetic, like a rural fair. There are, of course, all-black cable ends, often found in modular PSUs, where each cable can be connected or disconnected separately. To avoid the problem with colorful cable ends, check the photos in the store, and for length – read the reviews, as complaints about this are quite common. A simple solution to the problem could be buying a braided extension cable.",
    },
    "blok-9": {
        ua: "Отже, обирайте БЖ з тієї таблиці, дивіться на зображення, відгуки, і нехай служить він вам сто років і не підводить.",
        pl: "Więc wybierz zasilacz z tej tabeli, spójrz na zdjęcia, opinie i niech służy ci przez sto lat bez awarii",
        en: "So, choose a PSU from that table, look at the pictures, reviews, and may it serve you for a hundred years without fail.",
    },

    "korpus-1": {
        ua: "Корпус",
        pl: "Obudowa",
        en: "Case",
    },
    "korpus-2": {
        ua: "Вибір корпусу – це найскладніше завдання при складанні ПК, оскільки потрібно врахувати безліч факторів: місткість, продуваність і зовнішній вигляд.",
        pl: "Wybór obudowy to najtrudniejsze zadanie przy składaniu komputera, ponieważ trzeba wziąć pod uwagę wiele czynników: pojemność, przewiewność i wygląd zewnętrzny.",
        en: "Choosing a case is the most challenging task when building a PC, as you need to consider many factors: capacity, airflow, and appearance.",
    },
    "korpus-3": {
        ua: "1. Сумісність форм-фактору:",
        pl: "1. Zgodność formatu:",
        en: "1. Form Factor Compatibility:",
    },
    "korpus-4": {
        ua: "Корпус повинен відповідати форм-фактору вашої материнської плати. Такі позначення як “ATX”, “Micro-ATX”, “Mini-ITX” повинні бути вказані як у характеристиках материнки, так і корпусу.",
        pl: "Obudowa powinna pasować do formatu twojej płyty głównej. Takie oznaczenia jak „ATX”, „Micro-ATX”, „Mini-ITX” powinny być wskazane zarówno w specyfikacjach płyty głównej, jak i obudowy.",
        en: "The case should match the form factor of your motherboard. Designations such as 'ATX', 'Micro-ATX', 'Mini-ITX' should be indicated both in the motherboard's specifications and the case's.",
    },
    "korpus-5": {
        ua: "Корпус повинен підходити за форм-фактором для вашого блоку живлення. Наприклад, “ATX”, “SFX” чи “FLEX ATX”. Це також буде зазначено у характеристиках блоку та корпусу.",
        pl: "Obudowa powinna pasować do formatu twojego zasilacza. Na przykład „ATX”, „SFX” czy „FLEX ATX”. To również będzie wskazane w specyfikacjach zasilacza i obudowy.",
        en: "The case should fit the form factor of your power supply. For example, 'ATX', 'SFX', or 'FLEX ATX'. This will also be indicated in the power supply and case specifications.",
    },
    "korpus-6": {
        ua: "2. Розміри компонентів:",
        pl: "2. Wymiary komponentów:",
        en: "3. Component Sizes:",
    },
    "korpus-7": {
        ua: "Висота вашого кулера повинна поміщатися в корпус. Це особливо важливо для водяного охолодження – на верхній кришці чи спереду повинні поміщатися всі вентилятори.",
        pl: "Wysokość twojego chłodzenia powinna zmieścić się w obudowie. Jest to szczególnie ważne dla chłodzenia wodnego – wszystkie wentylatory powinny zmieścić się na górnej pokrywie lub z przodu.",
        en: "The height of your cooler should fit in the case. This is especially important for water cooling – all fans should fit on the top cover or in the front.",
    },
    "korpus-8": {
        ua: "Довжина відеокарти повинна вміщатися в корпус.",
        pl: "Długość karty graficznej powinna zmieścić się w obudowie.",
        en: "The length of the graphics card should fit in the case.",
    },
    "korpus-9": {
        ua: "У корпусі повинно бути достатньо слотів для встановлення жорстких дисків і SSD.",
        pl: "W obudowie powinno być wystarczająco dużo slotów na zamontowanie dysków twardych i SSD.",
        en: "The case should have enough slots for installing hard drives and SSDs.",
    },
    "korpus-10": {
        ua: "Якщо щось з цього списку не підходить, наприклад, материнка завелика або кулер не вміщується, але корпус вам дуже подобається, ви можете замінити щось із комплектуючих на аналогічні, але потрібних розмірів. Це не проблема і робиться за пару хвилин.",
        pl: "Jeśli coś z tej listy nie pasuje, na przykład płyta główna jest za duża lub chłodzenie się nie mieści, ale obudowa bardzo ci się podoba, możesz wymienić coś z komponentów na podobne, ale o odpowiednich rozmiarach. To nie problem i można to zrobić w kilka minut.",
        en: "If something from this list doesn't fit, such as the motherboard being too large or the cooler not fitting, but you really like the case, you can replace some components with similar ones of the required sizes. This is not a problem and can be done in a few minutes.",
    },
    "korpus-11": {
        ua: "3. Продуваність:",
        pl: "3. Przewiewność:",
        en: "3. Airflow:",
    },
    "korpus-12": {
        ua: "Є три типи корпусів за продуваністю: MESH, не MESH і баня.",
        pl: "Są trzy typy obudów pod względem przewiewności: MESH, nie MESH i sauna.",
        en: "There are three types of cases by airflow: MESH, non-MESH, and sauna.",
    },
    "korpus-13": {
        ua: "MESH – корпуси з перфорацією спереду, забезпечують кращу продуваність і виглядають солідно.",
        pl: "MESH – obudowy z perforacją z przodu, zapewniają lepszą przewiewność i wyglądają solidnie.",
        en: "MESH – cases with perforation at the front, providing better airflow and looking solid.",
    },
    "korpus-14": {
        ua: "Не MESH – корпуси без перфорації спереду, з глухою кришкою, буває скляною, і з боковим продуванням.",
        pl: "Nie MESH – obudowy bez perforacji z przodu, z pełną przednią pokrywą, czasem szklaną, z bocznym przewiewem.",
        en: "Non-MESH – cases without front perforation, with a solid front cover, sometimes glass, and side airflow.",
    },
    "korpus-15": {
        ua: "Баня – корпуси з глухою кришкою, продуванням ззаду або знизу, або взагалі без продування. Їх брати не можна.",
        pl: "Sauna – obudowy z pełną przednią pokrywą, przewiewem z tyłu lub od dołu, lub w ogóle bez przewiewu. Nie należy ich brać.",
        en: "Sauna – cases with a solid front cover, airflow from the back or bottom, or no airflow at all. These should not be taken.",
    },
    "korpus-16": {
        ua: "4. Вентилятори:",
        pl: "4. Wentylatory:",
        en: "4. Fans:",
    },
    "korpus-17": {
        ua: "В комплекті з корпусом вентилятори можуть бути або не бути, і на фото це не завжди зрозуміло. У характеристиках це буде вказано.",
        pl: "Obudowa może zawierać wentylatory lub nie, a na zdjęciach nie zawsze jest to widoczne. W specyfikacjach będzie to wskazane.",
        en: "The case may come with fans or not, and it's not always clear from the photos. It will be indicated in the specifications.",
    },
    "korpus-18": {
        ua: "Вентилятори потрібні обов’язково, принаймні один ззаду і пару спереду.",
        pl: "Wentylatory są konieczne, przynajmniej jeden z tyłu i kilka z przodu.",
        en: "Fans are essential, at least one at the back and a couple at the front.",
    },
    "korpus-19": {
        ua: "Перевірте, чи у вас достатньо інтерфейсів “sys fan” і “cha fan” на материнській платі або кабелів “Molex” на блоці живлення, якщо немає контролера для вентиляторів.",
        pl: "Sprawdź, czy masz wystarczająco dużo interfejsów „sys fan” i „cha fan” na płycie głównej lub kabli „Molex” w zasilaczu, jeśli nie masz kontrolera wentylatorów.",
        en: "Check if you have enough 'sys fan' and 'cha fan' interfaces on the motherboard or 'Molex' cables on the power supply if you don't have a fan controller.",
    },
    "korpus-20": {
        ua: "5. Зовнішній вигляд:",
        pl: "5. Wygląd zewnętrzny:",
        en: "5. Appearance:",
    },
    "korpus-21": {
        ua: "Бокове вікно обов’язкове – приріст FPS +10. Є акрилове скло, яке не є справжнім склом, і є загартоване скло, яке трохи дорожче, але є справжнім склом.",
        pl: "Boczne okno jest obowiązkowe – wzrost FPS +10. Jest akrylowe szkło, które nie jest prawdziwym szkłem, i jest hartowane szkło, które jest trochę droższe, ale jest prawdziwym szkłem.",
        en: "A side window is mandatory – FPS boost +10. There is acrylic glass, which is not real glass, and tempered glass, which is a bit more expensive but real glass.",
    },
    "korpus-22": {
        ua: "Корпус повинен вам подобатись. Він може бути будь-яким на ваш вибір, але нехай приносить вам радість і задоволення, як і вся ваша збірка.",
        pl: "Obudowa powinna ci się podobać. Może być dowolna według twojego wyboru, ale niech przynosi ci radość i satysfakcję, tak jak cała twoja składanka.",
        en: "The case should be to your liking. It can be any of your choice, but let it bring you joy and satisfaction, just like your entire build.",
    },
    "korpus-23": {
        ua: "Обирайте корпус уважно, враховуючи всі ці фактори, і нехай він служить вам довго та надійно.",
        pl: "Wybieraj obudowę uważnie, biorąc pod uwagę wszystkie te czynniki, i niech służy ci długo i niezawodnie.",
        en: "Choose the case carefully, considering all these factors, and let it serve you long and reliably.",
    },
   
};
// const formTexts = {
//     "head": {
//         ua: "Є питання? То питайте!",
//         pl: "Masz pytanie? Więc zapytaj!",
//         en: "Have a question? So ask!",
//     },

// };


// Перевірка сторінкм
function checkPagePathName() {
	switch (currentPathName) {
		case "Index.html":
			currentTexts = homeTexts;
			break;
        // case "/Contacts/Kontakty.html":
        //     currentTexts = formTexts;
        //     break;

		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

// Заміна текстів у сторінок
function changeLang() {
	for (const key in currentTexts) {
		let elem = document.querySelector(`[data-lang=${key}]`);
		if (elem) {
			elem.textContent = currentTexts[key][currentLang];
		}
	}
}
changeLang();

// Чіпляємо обробку на кожну кнопку
langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			btn.classList.add("header__btn_active");
			changeLang();
		}
	});
});

// Сброс активного класа активного елемента масиву
function resetActiveClass(arr, activeClass) {
	arr.forEach((elem) => {
		elem.classList.remove(activeClass);
	});
}

// Перевірка активної кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case "ua":
			document
				.querySelector('[data-btn="ua"]')
				.classList.add("header__btn_active");
			break;
		case "pl":
			document
				.querySelector('[data-btn="pl"]')
				.classList.add("header__btn_active");
			break;
		case "en":
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;

		default:
			document
				.querySelector('[data-btn="ua"]')
				.classList.add("header__btn_active");
			break;
	}
}
checkActiveLangButton();

// Перевіка мови браузера
function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((elem) => {
		return elem === navLang;
	});
	if (result) {
		return navLang;
	}
}

console.log("navigator.language", checkBrowserLang());