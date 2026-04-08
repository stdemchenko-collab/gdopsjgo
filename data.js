// Sample product data
const products = [
    {
        id: 1,
        name: "Ноутбук Dell XPS 13",
        category: "electronics",
        price: 89999,
        image: "image/Ноутбук Dell XPS 13.jpg",
        rating: 4.8,
        description: "Мощный ноутбук с процессором Intel Core i7 и SSD 512GB",
        details: "Процессор: Intel Core i7\nОЗУ: 16GB\nЖесткий диск: 512GB SSD\nДиагональ: 13.3 дюйма\nВес: 1.2 кг"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "electronics",
        price: 119999,
        image: "image/iPhone 15 Pro.png",
        rating: 4.9,
        description: "Флагманский смартфон Apple с A17 Pro",
        details: "Процессор: A17 Pro\nПамять: 256GB\nДисплей: 6.1\" OLED\nКамера: 48MP\nАккумулятор: 3400 мАч"
    },
    {
        id: 3,
        name: "Наушники Sony WH-1000XM5",
        category: "electronics",
        price: 34999,
        image: "image/Наушники Sony WH-1000XM5.png",
        rating: 4.7,
        description: "Беспроводные наушники с активным шумоподавлением",
        details: "Тип: Over-ear\nБатарея: 30 часов\nБлютуз: 5.3\nЧастотный диапазон: 4Hz-40kHz\nВес: 250g"
    },
    {
        id: 4,
        name: "HTML и CSS для начинающих",
        category: "books",
        price: 1299,
        image: "image/HTML и CSS для начинающих.jpg",
        rating: 4.6,
        description: "Полное руководство по веб-разработке",
        details: "Автор: Иван Петров\nСтраниц: 450\nИздание: 3-е переработанное\nГод: 2023"
    },
    {
        id: 5,
        name: "JavaScript: Полный справочник",
        category: "books",
        price: 2499,
        image: "image/JavaScript Полный справочник.jpg",
        rating: 4.8,
        description: "Компактный справочник по современному JavaScript",
        details: "Автор: Дэвид Флэнаган\nСтраниц: 650\nИздание: 2024\nПримеры кода включены"
    },
    {
        id: 6,
        name: "Python для аналитики данных",
        category: "books",
        price: 1899,
        image: "image/Python для аналитики данных.jpg",
        rating: 4.7,
        description: "Практическое руководство по анализу данных на Python",
        details: "Автор: Уэс Макинни\nСтраниц: 580\nУровень: средний\nПримеры: Pandas, NumPy"
    },
    {
        id: 7,
        name: "Футболка Adidas Classic",
        category: "clothes",
        price: 1299,
        image: "image/Футболка Adidas Classic.jpg",
        rating: 4.5,
        description: "Классическая спортивная футболка из хлопка",
        details: "Материал: 100% хлопок\nОсобенности: Дышащая ткань\nВеса: XS-3XL\nЦвет: черный, серый, синий"
    },
    {
        id: 8,
        name: "Кроссовки Nike Air Max",
        category: "clothes",
        price: 8999,
        image: "image/Кроссовки Nike Air Max.jpg",
        rating: 4.6,
        description: "Комфортные кроссовки для повседневной носки",
        details: "Бренд: Nike\nЦвет: черный/белый\nРазмеры: 35-47\nМатериал: синтетика + текстиль"
    },
    {
        id: 9,
        name: "Джинсы Levi's 501",
        category: "clothes",
        price: 5999,
        image: "image/Джинсы Levi's 501.jpg",
        rating: 4.7,
        description: "Классические синие джинсы конического кроя",
        details: "Бренд: Levi's\nМатериал: 100% хлопок деним\nФасон: прямой\nСтиль: классический"
    },
    {
        id: 10,
        name: "Куртка The North Face",
        category: "clothes",
        price: 12999,
        image: "image/Куртка The North Face.jpg",
        rating: 4.8,
        description: "Водонепроницаемая горная куртка",
        details: "Материал: Gore-Tex\nТемпература: до -20°C\nЦвет: черный, синий\nУтепление: синтепон"
    },
    {
        id: 11,
        name: "Монитор LG UltraWide",
        category: "electronics",
        price: 24999,
        image: "image/Монитор LG UltraWide.jpg",
        rating: 4.9,
        description: "Ультраширокий монитор 34 дюйма для продуктивности",
        details: "Разрешение: 3440x1440\nЧастота: 165Hz\nПанель: IPS\nВремя отклика: 1ms"
    },
    {
        id: 12,
        name: "Клавиатура Mechanical RGB",
        category: "electronics",
        price: 5999,
        image: "image/Клавиатура Mechanical RGB.jpg",
        rating: 4.7,
        description: "Механическая клавиатура с RGB подсветкой",
        details: "Переключатели: Cherry MX\nРазвёртка: 104 клавиши\nПодсветка: RGB\nСвязь: USB + Bluetooth"
    }
];

// Функция для получения товара по ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Функция для получения товаров по категории
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(p => p.category === category);
}

// Функция для поиска товаров
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}
