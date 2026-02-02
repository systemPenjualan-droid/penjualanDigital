// DATA PRODUK SEMBAKO UNTUK UMKM

const sembakoProducts = [
    {
        id: "SEM001",
        name: "Beras Premium",
        category: "Bahan Pokok",
        price: 12500,
        stock: 150,
        unit: "kg",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZFREJEIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2QjRGMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5CUkVTPC90ZXh0Pgo8dGV4dCB4PSI2NCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZCNEYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UFJFTUlVTTwvdGV4dD4KPC9zdmc+",
        barcode: "8991002101010"
    },
    {
        id: "SEM002",
        name: "Gula Pasir",
        category: "Bahan Pokok",
        price: 14000,
        stock: 200,
        unit: "kg",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGQ0NEIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNEQjg4MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5HVUxBPC90ZXh0Pgo8dGV4dCB4PSI2NCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0RCODMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UEFTQVI8L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101027"
    },
    {
        id: "SEM003",
        name: "Minyak Goreng",
        category: "Bahan Pokok",
        price: 18000,
        stock: 120,
        unit: "liter",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGNkEwIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM4QzZBMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5NSU5ZQUs8L3RleHQ+Cjx0ZXh0IHg9IjY0IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOEM2QTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5HT1JFTkc8L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101034"
    },
    {
        id: "SEM004",
        name: "Telur Ayam",
        category: "Protein",
        price: 28000,
        stock: 80,
        unit: "kg",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGRkZGIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2QjRGMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5URUxVUjwvdGV4dD4KPHRleHQgeD0iNjQiIHk9IjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjRGMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFZQU08L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101041"
    },
    {
        id: "SEM005",
        name: "Mie Instan",
        category: "Makanan Instan",
        price: 3000,
        stock: 500,
        unit: "pcs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGQ0NEIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNEQjg4MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5NSUU8L3RleHQ+Cjx0ZXh0IHg9IjY0IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjREI4ODAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JTlNUQU48L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101058"
    },
    {
        id: "SEM006",
        name: "Sabun Mandi",
        category: "Kebersihan",
        price: 5000,
        stock: 300,
        unit: "pcs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjBFRUZGIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMyMTk2RjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5TQUJVTjwvdGV4dD4KPHRleHQgeD0iNjQiIHk9IjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMyMTk2RjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1BTkRIPC90ZXh0Pgo8L3N2Zz4=",
        barcode: "8991002101065"
    },
    {
        id: "SEM007",
        name: "Shampoo",
        category: "Kebersihan",
        price: 12000,
        stock: 150,
        unit: "pcs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRThGM0ZGIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMwMDdDQ0IiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5TSEFNUE9PPC90ZXh0Pgo8dGV4dCB4PSI2NCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwN0NDQiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+MjAwTUw8L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101072"
    },
    {
        id: "SEM008",
        name: "Kopi Sachet",
        category: "Minuman",
        price: 1500,
        stock: 400,
        unit: "pcs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjNUQ0MDJBIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5LT1BJPC90ZXh0Pgo8dGV4dCB4PSI2NCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcrialIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TQUNIRVQ8L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101089"
    },
    {
        id: "SEM009",
        name: "Teh Celup",
        category: "Minuman",
        price: 10000,
        stock: 250,
        unit: "pcs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjNENBQTQzIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5URUg8L3RleHQ+Cjx0ZXh0IHg9IjY0IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNppl6PSIxNCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q0VMVVA8L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101096"
    },
    {
        id: "SEM010",
        name: "Garam",
        category: "Bahan Pokok",
        price: 4000,
        stock: 100,
        unit: "kg",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGRkZGIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM3Nzc3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5HQVJBTTwvdGV4dD4KPC9zdmc+",
        barcode: "8991002101102"
    },
    {
        id: "SEM011",
        name: "Tepung Terigu",
        category: "Bahan Pokok",
        price: 11000,
        stock: 80,
        unit: "kg",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGRkZGIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2QjRGMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5URVBVTkc8L3RleHQ+Cjx0ZXh0IHg9IjY0IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI0RjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5URVJJR1U8L3RleHQ+Cjwvc3ZnPg==",
        barcode: "8991002101119"
    },
    {
        id: "SEM012",
        name: "Mentega",
        category: "Bahan Pokok",
        price: 15000,
        stock: 60,
        unit: "pcs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRkZGNkEwIiByeD0iMTYiLz4KPHRleHQgeD0iNjQiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNFQjlDMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5NRU5URUdBPC90ZXh0Pgo8L3N2Zz4=",
        barcode: "8991002101126"
    }
];

// Kategori Produk
const categories = [
    { id: "all", name: "Semua Produk", icon: "fas fa-boxes" },
    { id: "Bahan Pokok", name: "Bahan Pokok", icon: "fas fa-wheat" },
    { id: "Protein", name: "Protein", icon: "fas fa-egg" },
    { id: "Makanan Instan", name: "Makanan Instan", icon: "fas fa-utensils" },
    { id: "Minuman", name: "Minuman", icon: "fas fa-coffee" },
    { id: "Kebersihan", name: "Kebersihan", icon: "fas fa-soap" }
];

// Transaksi History (simulasi database lokal)
let transactions = JSON.parse(localStorage.getItem('sembako_transactions')) || [];

// Settings Toko
const defaultSettings = {
    storeName: "TOKO SEMBAKO MAKMUR",
    storeAddress: "Jl. Raya No. 123, Desa Sejahtera",
    storePhone: "0812-3456-7890",
    taxRate: 10,
    receiptFooter: "Terima kasih telah berbelanja!\nBarang yang sudah dibeli tidak dapat ditukar/dikembalikan."
};

// Load settings from localStorage or use defaults
let storeSettings = JSON.parse(localStorage.getItem('sembako_settings')) || defaultSettings;

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sembakoProducts, categories, transactions, storeSettings };
}