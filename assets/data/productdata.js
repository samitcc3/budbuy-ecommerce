export class ProductData {
  constructor() {
    // Load products from localStorage or use the default list
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    this.products =
      storedProducts.length > 0
        ? storedProducts
        : [
            {
              product_id: 1,
              name: "Samsung DU6900 CUHD 4K 43",
              details:
                "Your favourite content comes to life with stunning clarity and dynamic audio, all powered by the advanced capabilities of the Samsung Tizen OS.",
              sku: 3096122,
              category: "TV",
              brand: "Samsung",
              stock: 10,
              updated_at: "10/11/2024",
              price: 399.99,
              discount: 50.0,
              discount_name: "Black Friday",
              discount_exp: "31/12/2024",
              specifications: {
                screen_size: "43 inches",
                resolution: "4K UHD",
                smart_tv: "Yes",
                operating_system: "Tizen OS",
                display_type: "CUHD",
                color: "Black",
              },
              image_url:
                "assets/images/products/Samsung DU6900 CUHD 4K 43.webp",
            },
            {
              product_id: 2,
              name: "Samsung Q60D QLED 4K Dual LED 65",
              details:
                "Enjoy brilliant, long-lasting colours with Quantum Dot. Experience close to a billion shades with Colour Volume. 4K AI Upscaling sharpens faster moving objects such as balls and pucks so you are never left guessing. All in an AirSlim sleek design.",
              sku: 3096130,
              category: "TV",
              brand: "Samsung",
              stock: 10,
              updated_at: "10/11/2024",
              price: 999.99,
              discount: 10.0,
              discount_name: "BudBuy Days",
              discount_exp: "31/12/2024",
              specifications: {
                screen_size: "65 inches",
                resolution: "4K UHD",
                smart_tv: "Yes",
                operating_system: "Tizen OS",
                display_type: "QLED",
                color: "Black",
              },
              image_url:
                "assets/images/products/Samsung Q60D QLED 4K Dual LED 65.webp",
            },
            {
              product_id: 3,
              name: "Samsung DU7100 CUHD 4K 43",
              details:
                "Enjoy brilliant, long-lasting colours with Quantum Dot. Experience close to a billion shades with Colour Volume. 4K AI Upscaling sharpens faster moving objects such as balls and pucks so you are never left guessing. All in an AirSlim sleek design.",
              sku: 3096115,
              category: "TV",
              brand: "Samsung",
              stock: 10,
              updated_at: "10/11/2024",
              price: 499.99,
              discount: 0.0,
              discount_name: null,
              discount_exp: null,
              specifications: {
                screen_size: "43 inches",
                resolution: "4K UHD",
                smart_tv: "Yes",
                operating_system: "Tizen OS",
                display_type: "CUHD",
                color: "Black",
              },
              image_url:
                "assets/images/products/Samsung DU7100 CUHD 4K 43.webp",
            },
            {
              product_id: 4,
              name: "JBL Flip 6 - Portable Waterproof Bluetooth Speaker",
              details:
                "Your adventure. Your soundtrack. The bold new JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity thanks to its 2-way speaker system consisting of an optimized racetrack-shaped driver, separate tweeter, and dual pumping bass radiators. This big-sounding, yet easy to carry speaker is waterproof and dustproof, so you can take it anywhere in any weather. And with 12 hours of battery life, you can party 'til the sun goes down - or comes up - wherever the music moves you. Use PartyBoost to link multiple compatible speakers.",
              sku: 3026238,
              category: "Audio",
              brand: "JBL",
              stock: 10,
              updated_at: "10/11/2024",
              price: 169.99,
              discount: 15.0,
              discount_name: "Clearance",
              discount_exp: "31/12/2024",
              specifications: {
                battery_life: "12 hours",
                waterproof: "Yes",
                connectivity: "Bluetooth",
                weight: "0.5 kg",
                color: "Black",
              },
              image_url:
                "assets/images/products/JBL Flip 6 - Portable Waterproof Bluetooth Speaker.webp",
            },
            {
              product_id: 5,
              name: "Bose Soundlink Flex Portable Speaker (2nd Gen)",
              details:
                "Sound for any all-day runway. The SoundLink Flex Portable Bluetooth speaker is the perfect chic musical sidekick, with a waterproof, dustproof, life-proof design that can handle whatever comes your way with dazzling sound and deep bass. So whether you're storming the city, hanging by the beach, or just having friends over for dinner, the powerful SoundLink Flex helps you elevate the moment.",
              sku: 3099986,
              category: "Audio",
              brand: "Bose",
              stock: 10,
              updated_at: "10/11/2024",
              price: 189.09,
              discount: 0.0,
              discount_name: null,
              discount_exp: null,
              specifications: {
                battery_life: "8 hours",
                waterproof: "Yes",
                connectivity: "Bluetooth",
                weight: "1.0 kg",
                color: "Black",
              },
              image_url:
                "assets/images/products/Bose Soundlink Flex Portable Speaker (2nd Gen).webp",
            },
            {
              product_id: 6,
              name: "Apple Watch Series 10 - 46mm",
              details:
                "Meet Apple Watch Series 10. A bigger display with more screen area and a thinner, lighter design. Get advanced fitness and health features with Sleep Apnea Notifications, plus faster charging. The Sleep Apnea Notification Feature is available on Apple Watch Series 9 and later and Ultra 2. It is intended to detect signs of moderate to severe sleep apnea for people 18 or older without a diagnosis of sleep apnea.",
              sku: 3038254,
              category: "Wearables",
              brand: "Apple",
              stock: 10,
              updated_at: "10/11/2024",
              price: 589.99,
              discount: 0.0,
              discount_name: null,
              discount_exp: null,
              specifications: {
                battery_life: "15 hours",
                connectivity: "Wi-Fi, Bluetooth",
                weight: "1.8 kg",
                color: "Silver",
              },
              image_url:
                "assets/images/products/Apple Watch Series 10 - 46mm.webp",
            },
            {
              product_id: 7,
              name: "Fitbit Versa 4 Smart Watch",
              details:
                "Get better results from your workout routine with all-new Versa 4. Know when you\u2019re up for a challenge or need a recovery day with your personalized Daily Readiness Score. Track more exercises than ever right from your wrist with 40 plus exercise modes.",
              sku: 3037290,
              category: "Wearables",
              brand: "FitBit",
              stock: 10,
              updated_at: "10/11/2024",
              price: 259.99,
              discount: 10.0,
              discount_name: "BudBuy Days",
              discount_exp: "31/12/2024",
              specifications: {
                screen_size: "55 inches",
                resolution: "4K UHD",
                smart_tv: "Yes",
                operating_system: "WebOS",
              },
              image_url:
                "assets/images/products/Fitbit Versa 4 Smart Watch.webp",
            },
            {
              product_id: 8,
              name: "Samsung Galaxy Tab S9 FE",
              details:
                "Explore a new world with Galaxy Tab S9 FE. This amazing introduction to tablets boasts a powerful processor, a long-lasting battery and a dynamic screen to help you stay on top of your day. You'll have plenty of room on your 10.9\" screen to take on your to-do list, explore your creativity with the included S Pen or dive into your favourite entertainment.",
              sku: 3078813,
              category: "Tablets",
              brand: "Samsung",
              stock: 10,
              updated_at: "10/11/2024",
              price: 599.99,
              discount: 40.0,
              discount_name: "Black Friday",
              discount_exp: "31/12/2024",
              specifications: {
                storage: "256GB SSD",
                ram: "8GB",
                processor: "Intel Core i5",
                screen_size: "14 inches",
              },
              image_url: "assets/images/products/Samsung Galaxy Tab S9 FE.webp",
            },
            {
              product_id: 9,
              name: "Apple 10th Generation iPad",
              details:
                "Colourfully reimagined and more versatile than ever. With an all-screen design,10.9-inch Liquid Retina display and four gorgeous colours. iPad delivers a powerful way to create, stay connected and get things done.",
              sku: 3010042,
              category: "Tablets",
              brand: "Apple",
              stock: 10,
              updated_at: "10/11/2024",
              price: 499.99,
              discount: 45.0,
              discount_name: "Black Friday",
              discount_exp: "31/12/2024",
              specifications: {
                battery_capacity: "5000mAh",
                camera: "108MP",
                connectivity: "5G",
                weight: "0.4 kg",
              },
              image_url:
                "assets/images/products/Apple 10th Generation iPad.webp",
            },
            {
              product_id: 10,
              name: "Apple iPhone 16 Pro Max",
              details:
                "iPhone 16 Pro Max. Built for Apple Intelligence. Featuring a stunning titanium design. Camera Control. 4K 120 fps Dolby Vision. And A18 Pro chip.",
              sku: 3076902,
              category: "Phones",
              brand: "Apple",
              stock: 10,
              updated_at: "10/11/2024",
              price: 1749.99,
              discount: 35.0,
              discount_name: "BudBuy Days",
              discount_exp: "31/12/2024",
              specifications: {
                refresh_rate: "120Hz",
                screen_size: "27 inches",
                resolution: "2560x1440 (QHD)",
                panel_type: "IPS",
              },
              image_url: "assets/images/products/Apple iPhone 16 Pro Max.webp",
            },
            {
              product_id: 11,
              name: "Apple iPhone 16",
              details:
                "iPhone 16. Built for Apple Intelligence. Featuring Camera Control. 48MP Fusion camera. Five vibrant colours. And A18 chip.",
              sku: 3076896,
              category: "Phones",
              brand: "Apple",
              stock: 10,
              updated_at: "10/11/2024",
              price: 1129.99,
              discount: 40.0,
              discount_name: "Black Friday",
              discount_exp: "31/12/2024",
              specifications: {
                storage: "512GB SSD",
                ram: "16GB",
                processor: "Intel Core i7",
                screen_size: "15.6 inches",
              },
              image_url: "assets/images/products/Apple iPhone 16.webp",
            },
            {
              product_id: 12,
              name: "Samsung Galaxy S24 Ultra",
              details:
                "Galaxy AI is here. Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility - starting with your smartphone.",
              sku: 3084777,
              category: "Phones",
              brand: "Samsung",
              stock: 10,
              updated_at: "10/11/2024",
              price: 1499.99,
              discount: 30.0,
              discount_name: "Black Friday",
              discount_exp: "31/12/2024",
              specifications: {
                connectivity: "Bluetooth 5.0",
                battery_life: "24 hours",
                audio_quality: "High-Res Audio",
              },
              image_url: "assets/images/products/Samsung Galaxy S24 Ultra.webp",
            },
            {
              product_id: 13,
              name: "Apple MacBook Air 15.3",
              details:
                "The M3 chip brings even greater capabilities to the super portable 15-inch MacBook Air. With up to 18 hours of battery life and a spacious Liquid Retina display, you can take it anywhere and blaze through work and play.",
              sku: 3076916,
              category: "Laptops",
              brand: "Apple",
              stock: 10,
              updated_at: "10/11/2024",
              price: 1449.99,
              discount: 20.0,
              discount_name: "BudBuy Days",
              discount_exp: "31/12/2024",
              specifications: {
                screen_size: "15.3 inches",
                processor: "M3 chip",
                ram: "8GB unified memory",
                storage: "256GB SSD",
                battery_life: "Up to 18 hours",
                resolution: "2560 x 1664 (Liquid Retina)",
                weight: "1.51 kg",
                ports: "MagSafe 3, 2x Thunderbolt 4, 3.5mm headphone jack",
                color: "Silver",
              },
              image_url: "assets/images/products/Apple MacBook Air 15.3.webp",
            },
            {
              product_id: 14,
              name: "ASUS ROG Zephyrus Duo 16",
              details:
                "When you need to render large video files or perform other intensive tasks, you can rely on the latest AMD Ryzen 9 7945HX processor. This flagship CPU offers exceptional multithreaded performance, while also maintaining best-in-class gaming ability. With more than double the performance in Cinebench R23 compared to the previous generation, AMD\u2019s Dragon Range architecture combined with ROG\u2019s overclocking expertise delivers incredible power.",
              sku: 3087580,
              category: "Laptops",
              brand: "Asus",
              stock: 10,
              updated_at: "10/11/2024",
              price: 4799.99,
              discount: 15.0,
              discount_name: "Clearance",
              discount_exp: "31/12/2024",
              specifications: {
                screen_size:
                  "16 inches (main display), 14 inches (secondary ScreenPad Plus)",
                processor: "AMD Ryzen 9 7945HX",
                ram: "32GB DDR5",
                storage: "2TB SSD",
                gpu: "NVIDIA GeForce RTX 4090",
                refresh_rate: "165Hz",
                resolution: "2560 x 1600 (QHD+)",
                weight: "2.55 kg",
                ports:
                  "2x USB 3.2 Gen 2, 1x USB-C, HDMI 2.1, RJ45 LAN, Audio combo jack",
                color: "Black",
              },
              image_url: "assets/images/products/ASUS ROG Zephyrus Duo 16.webp",
            },
          ];
  }

  // Save products to localStorage
  saveToStorage() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  // Get all products
  getAllProducts() {
    return this.products;
  }

  // Find product by SKU
  findProductBySKU(sku) {
    return this.products.find((product) => product.sku === sku) || null;
  }

  // Edit stock of a product
  editStock(sku, newStock) {
    const product = this.findProductBySKU(sku);
    if (product) {
      product.stock = newStock;
      product.updated_at = new Date().toISOString();
      this.saveToStorage(); // Persist changes
      return true;
    }
    return false;
  }

  // Add a new product
  addProduct(newProduct) {
    if (this.findProductBySKU(newProduct.sku)) {
      throw new Error("Product with this SKU already exists.");
    }
    const maxId = Math.max(
      ...this.products.map((product) => product.product_id),
      0
    );
    newProduct.product_id = maxId + 1;
    newProduct.updated_at = new Date().toISOString();
    this.products.push(newProduct);
    this.saveToStorage(); // Persist changes
    return true;
  }

  // Delete a product by ID
  deleteProductById(productId) {
    const initialLength = this.products.length;
    this.products = this.products.filter(
      (product) => product.product_id !== productId
    );
    const isDeleted = this.products.length < initialLength;
    if (isDeleted) this.saveToStorage(); // Persist changes if deletion occurred
    return isDeleted;
  }
}
