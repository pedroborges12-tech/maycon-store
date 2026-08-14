export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Camiseta Oversized MS Heavy Gold",
    category: "camisetas",
    price: 159.90,
    originalPrice: 199.90,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: [
      { name: "Preto Gold", hex: "#09090B" },
      { name: "Off White", hex: "#F4F4F0" },
      { name: "Verde Militar", hex: "#2C3529" }
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 38,
    description: "Modelagem Oversized Box exclusiva Maycon Store. Tecido Heavy Cotton 260g/m², toque ultra macio, gola ribana encorpada de 3cm e bordado MS em fio de ouro 18k no peito.",
    isNew: true,
    isBestSeller: true,
    details: [
      "100% Algodão Pima 260g Premium",
      "Modelagem Oversized Dropped Shoulder",
      "Bordado MS Frontal Dourado Metálico",
      "Gola Canelada 3cm Alta Densidade",
      "Pré-encolhida (não encolhe na lavagem)"
    ]
  },
  {
    id: "prod-2",
    name: "Camisa Polo MS Piquet Gold Edition",
    category: "polos",
    price: 189.90,
    originalPrice: 229.90,
    images: [
      "https://images.unsplash.com/photo-1625910513413-562a04870f72?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Black Gold", hex: "#121214" },
      { name: "Marinho Gold", hex: "#0E1A2B" }
    ],
    stock: 8,
    rating: 4.8,
    reviewCount: 24,
    description: "Reinterpretação streetwear da clássica Polo. Malha piquet estruturada 100% algodão, botões em madrepérola escura gravados a laser e monograma MS Gold minimalista.",
    isNew: true,
    isBestSeller: false,
    details: [
      "Malha Piquet Duplo de Algodão",
      "Botões exclusivos gravados MS",
      "Fendas laterais para melhor caimento",
      "Toque aveludado interno"
    ]
  },
  {
    id: "prod-3",
    name: "Bermuda Cargo MS Tactical Black",
    category: "bermudas",
    price: 199.90,
    originalPrice: 249.90,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Black Obsidian", hex: "#09090B" },
      { name: "Caqui Urban", hex: "#9E8B6E" }
    ],
    stock: 5,
    rating: 5.0,
    reviewCount: 42,
    description: "Bermuda Cargo Utilitária em Sarja Heavy Weight com 6 bolsos multifuncionais, fivelas de ajuste tático e acabamento em zíper selado à prova d'água.",
    isNew: false,
    isBestSeller: true,
    details: [
      "Sarja 100% Algodão Ripstop 280g",
      "6 Bolsos estratégicos táticos",
      "Cinto em fita de gorgurão embutido",
      "Puxadores de zíper customizados MS"
    ]
  },
  {
    id: "prod-4",
    name: "Tênis MS Street Runner Black Gold",
    category: "calcados",
    price: 399.90,
    originalPrice: 489.90,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [
      { name: "Black / Gold", hex: "#000000" }
    ],
    stock: 6,
    rating: 4.9,
    reviewCount: 19,
    description: "Sneaker urbano em couro legítimo nobuck e mesh respirável. Solado chunky tratorado em borracha vulcanizada com detalhes reflexivos 3M e logo MS Gold moldado em relevo.",
    isNew: true,
    isBestSeller: true,
    details: [
      "Cabedal em Couro Camurça + Mesh Tático",
      "Palmilha Memory Foam Comfort MS",
      "Solado Antiderrapante Vulcanizado",
      "Cadárço extra em fio trançado Gold"
    ]
  },
  {
    id: "prod-5",
    name: "Corrente MS Cuban Gold Plated 18k",
    category: "acessorios",
    price: 139.90,
    originalPrice: 179.90,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591475179-62cd347e0b7b?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["60cm", "70cm"],
    colors: [
      { name: "Ouro 18k", hex: "#D4AF37" }
    ],
    stock: 20,
    rating: 4.9,
    reviewCount: 56,
    description: "Corrente modelo Grumet / Cuban Link de 8mm banhada a Ouro 18k (10 milésimos) com verniz italiano hipoalergênico. Acompanha pingente exclusivo MS Monograma.",
    isNew: false,
    isBestSeller: true,
    details: [
      "Banho Ouro 18k 10 Milésimos Premium",
      "Verniz de Proteção Hipoalergênico",
      "Fecho Gaveta Duplo com Trava de Segurança",
      "Garantia de 1 Ano no Banho"
    ]
  },
  {
    id: "prod-6",
    name: "Camiseta Oversized MS Cyber Graphic",
    category: "camisetas",
    price: 149.90,
    originalPrice: 189.90,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Obsidian Black", hex: "#09090B" }
    ],
    stock: 11,
    rating: 4.7,
    reviewCount: 15,
    description: "Camiseta Oversized com estampa técnica 'Urban Cyber' nas costas em Silk Screen em relevo de alto brilho e toque macio.",
    isNew: true,
    isBestSeller: false,
    details: [
      "100% Algodão 240g",
      "Estampa Silk HD Costas",
      "Etiqueta de autenticidade na barra"
    ]
  },
  {
    id: "prod-7",
    name: "Shoulder Bag MS Tactical Gold",
    category: "acessorios",
    price: 119.90,
    originalPrice: 149.90,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["Único"],
    colors: [
      { name: "Preto / Dourado", hex: "#09090B" }
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 31,
    description: "Bolsa transversal Shoulder Bag em Poliéster Cordura 600D ultra resistente. Possui 3 compartimentos com zíper selado e alça ajustável com jacquard MS.",
    isNew: false,
    isBestSeller: true,
    details: [
      "Tecido Cordura Impermeável",
      "Alça Removível Jacquard MS",
      "Chaveiro tático incluso"
    ]
  },
  {
    id: "prod-8",
    name: "Bermuda Moletom MS Heavy Street",
    category: "bermudas",
    price: 169.90,
    originalPrice: 209.90,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Cinza Mescla Gold", hex: "#4A4A4A" },
      { name: "Preto", hex: "#09090B" }
    ],
    stock: 9,
    rating: 4.9,
    reviewCount: 27,
    description: "Bermuda em Moletom 3 Cabos felpado de gramatura pesada (360g). Cordão grosso com ponteiras de metal dourado e bolso traseiro com bordado MS.",
    isNew: false,
    isBestSeller: false,
    details: [
      "Moletom 3 Cabos Algodão + Poliéster",
      "Interiores Felpados Aquecidos",
      "Ponteira de Metal Gold Antioxidante"
    ]
  }
];

export const INITIAL_BANNERS = [
  {
    id: "banner-1",
    badge: "COLEÇÃO OVERSIZED 2026",
    title: "MAYCON STORE DROP 01",
    subtitle: "Estilo urbano autêntico com caimento pesado e acabamento em fios de ouro.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    ctaText: "VER COMPRE AGORA",
    ctaLink: "#produtos",
    active: true,
    displayOrder: 1
  },
  {
    id: "banner-2",
    badge: "OFERTA POR TEMPO LIMITADO",
    title: "FRETE GRÁTIS EM TODO BRASIL",
    subtitle: "Nas compras acima de R$ 299,00. Use o cupom FRETEGOLD no checkout.",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
    ctaText: "GARANTIR MEU LOOK",
    ctaLink: "#produtos",
    active: true,
    displayOrder: 2
  },
  {
    id: "banner-3",
    badge: "ANIVERSÁRIO MAYCON STORE",
    title: "15% OFF EM TODO O SITE",
    subtitle: "Utilize o cupom MAYCON15 e garanta os mais vendidos com desconto especial.",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80",
    ctaText: "APROVEITAR CUPOM",
    ctaLink: "#produtos",
    active: true,
    displayOrder: 3
  }
];

export const INITIAL_COUPONS = [
  {
    id: "coup-1",
    code: "MAYCON15",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 100,
    active: true
  },
  {
    id: "coup-2",
    code: "FRETEGOLD",
    discountType: "fixed",
    discountValue: 25,
    minOrder: 200,
    active: true
  },
  {
    id: "coup-3",
    code: "FIRSTMS",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 0,
    active: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: "MS-84920",
    date: "2026-08-13T14:32:00",
    customer: {
      name: "Lucas Mendes",
      email: "lucas.mendes@gmail.com",
      phone: "(11) 98765-4321",
      cpf: "123.456.789-00",
      address: {
        street: "Av. Paulista",
        number: "1500",
        complement: "Apto 82",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zip: "01310-200"
      }
    },
    items: [
      {
        productId: "prod-1",
        name: "Camiseta Oversized MS Heavy Gold",
        size: "G",
        color: "Preto Gold",
        price: 159.90,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-5",
        name: "Corrente MS Cuban Gold Plated 18k",
        size: "60cm",
        color: "Ouro 18k",
        price: 139.90,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80"
      }
    ],
    total: 299.80,
    discount: 0,
    shippingFee: 0,
    paymentMethod: "pix",
    paymentStatus: "paid",
    orderStatus: "em_preparacao",
    nfcKey: "35260812345678000199550010000849201987654321",
    pixCopyPaste: "00020126580014br.gov.bcb.pix0136mayconstore@pay.com5204000053039865405299.805802BR5912MAYCON STORE6009SAO PAULO62070503***6304E8A2"
  },
  {
    id: "MS-84919",
    date: "2026-08-13T10:15:00",
    customer: {
      name: "Matheus Oliveira",
      email: "matheus.oli@hotmail.com",
      phone: "(21) 99876-1234",
      cpf: "987.654.321-11",
      address: {
        street: "Rua Visconde de Pirajá",
        number: "405",
        complement: "",
        neighborhood: "Ipanema",
        city: "Rio de Janeiro",
        state: "RJ",
        zip: "22410-003"
      }
    },
    items: [
      {
        productId: "prod-4",
        name: "Tênis MS Street Runner Black Gold",
        size: "42",
        color: "Black / Gold",
        price: 399.90,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80"
      }
    ],
    total: 399.90,
    discount: 0,
    shippingFee: 0,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    orderStatus: "enviado",
    nfcKey: "35260812345678000199550010000849191987654322",
    trackingCode: "BR987654321MS"
  }
];

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Camisetas Oversized", slug: "camisetas" },
  { id: "cat-2", name: "Polos Piquet", slug: "polos" },
  { id: "cat-3", name: "Bermudas", slug: "bermudas" },
  { id: "cat-4", name: "Calçados", slug: "calcados" },
  { id: "cat-5", name: "Acessórios", slug: "acessorios" }
];

export const MOCK_REVIEWS = [
  {
    id: "rev-1",
    name: "Gabriel Santos",
    rating: 5,
    date: "há 2 dias",
    comment: "Qualidade surreal! O algodão da camiseta oversized é realmente bem pesado, não deforma na lavagem e o bordado em ouro é impecável. Virei cliente fiel da Maycon Store!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rev-2",
    name: "Felipe Ramos",
    rating: 5,
    date: "há 5 dias",
    comment: "Entrega super rápida via Pix! A bermuda cargo encaixou perfeitamente, acabamento de marca gringa. Recomendo demais pra quem curte streetwear pesado.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rev-3",
    name: "Rodrigo Costa",
    rating: 5,
    date: "há 1 semana",
    comment: "Tênis mais confortável que já comprei nesse estilo chunky. Visual absurdo com a corrente banhada 18k. Parabéns Maycon Store!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];
