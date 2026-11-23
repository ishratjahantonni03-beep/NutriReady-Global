export type LocaleCode = 'en' | 'es' | 'ar' | 'vi' | 'fr';

export interface LocaleMeta {
  code: LocaleCode;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: LocaleMeta[] = [
  {code: 'en', nativeName: 'English', dir: 'ltr'},
  {code: 'es', nativeName: 'Español', dir: 'ltr'},
  {code: 'ar', nativeName: 'العربية', dir: 'rtl'},
  {code: 'vi', nativeName: 'Tiếng Việt', dir: 'ltr'},
  {code: 'fr', nativeName: 'Français', dir: 'ltr'},
];

export interface TranslationStrings {
  nav: {
    overview: string;
    rations: string;
    planner: string;
    safety: string;
  };
  guarantee: {
    commitmentPrimary: string;
    commitmentSecondary: string;
    offlineAction: string;
  };
  overview: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    browseRationsCta: string;
    openPlannerCta: string;
    kpiHubsOpen: string;
    kpiDailyMeals: string;
    kpiBoilZones: string;
    kpiInfantPacks: string;
    hubsHeading: string;
    hubsSubheading: string;
    filterAll: string;
    filterOpenNow: string;
    filterStepFree: string;
    filterInfantStock: string;
    inspectRations: string;
    noHubMatches: string;
    resetFilters: string;
  };
  rations: {
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    allDiets: string;
    noCookFilter: string;
    boilWaterFilter: string;
    viewPrepGuide: string;
    closeDetail: string;
    prepStepsTitle: string;
    allergenTitle: string;
    availableAtTitle: string;
    noRationMatches: string;
  };
  planner: {
    heading: string;
    subheading: string;
    localNotice: string;
    householdTitle: string;
    adultsLabel: string;
    childrenLabel: string;
    infantsLabel: string;
    pregnantLabel: string;
    dietAndFuelTitle: string;
    fuelNoHeat: string;
    fuelCanBoil: string;
    resultsTitle: string;
    totalEnergyLabel: string;
    drinkingWaterLabel: string;
    prepWaterLabel: string;
    recommendedPacksTitle: string;
    downloadChecklist: string;
    printPlan: string;
  };
  safety: {
    heading: string;
    subheading: string;
    waterTitle: string;
    waterVolumeLabel: string;
    boilProtocolTitle: string;
    bleachProtocolTitle: string;
    startTimer: string;
    resetTimer: string;
    timerRunning: string;
    timerDone: string;
    triageTitle: string;
    infantTitle: string;
  };
  footer: {
    privacyNote: string;
    printSummary: string;
  };
}

export const TRANSLATIONS: Record<LocaleCode, TranslationStrings> = {
  en: {
    nav: {
      overview: 'Overview',
      rations: 'Rations',
      planner: 'Planner',
      safety: 'Safety Guide',
    },
    guarantee: {
      commitmentPrimary: 'Emergency food is never conditional on registration.',
      commitmentSecondary: 'No names. No personal data.',
      offlineAction: 'Offline Card',
    },
    overview: {
      heroTitle: 'Dignified food and clean water access, ready when you arrive.',
      heroSubtitle:
        'Check open community distribution hubs, inspect dietary and allergen-safe ration packs, and calculate 72-hour household hydration without sharing any personal details.',
      searchPlaceholder: 'Filter by neighborhood, transit stop, or street...',
      browseRationsCta: 'Browse Ration Packs',
      openPlannerCta: '72-Hour Planner',
      kpiHubsOpen: 'Hubs Open Now',
      kpiDailyMeals: 'Meals Available Today',
      kpiBoilZones: 'Boil-Water Advisories',
      kpiInfantPacks: 'Infant & Special Packs',
      hubsHeading: 'Active Community Distribution Hubs',
      hubsSubheading:
        'Walk-up service with step-free pathways and multilingual volunteers on site.',
      filterAll: 'All Hubs',
      filterOpenNow: 'Open Now',
      filterStepFree: 'Step-Free Access',
      filterInfantStock: 'Infant Packs Ready',
      inspectRations: 'Inspect Stocked Rations',
      noHubMatches: 'No distribution hubs match your current filter.',
      resetFilters: 'Show All Hubs',
    },
    rations: {
      heading: 'Emergency Rations & Dietary Specifications',
      subheading:
        'Every pack lists exact energy values, preparation requirements, and verified allergen controls before pickup.',
      searchPlaceholder: 'Search by meal name, ingredient, or allergen...',
      allDiets: 'All Diets',
      noCookFilter: 'No-Cook Ready',
      boilWaterFilter: 'Boiling Water Needed',
      viewPrepGuide: 'Nutrition & Prep Guide',
      closeDetail: 'Close Guide',
      prepStepsTitle: 'Safe Preparation Steps',
      allergenTitle: 'Allergen & Dietary Verification',
      availableAtTitle: 'Currently Stocked At',
      noRationMatches: 'No ration packs match your selected dietary or prep filters.',
    },
    planner: {
      heading: '72-Hour Household Nutrition & Water Planner',
      subheading:
        'Estimate daily calorie needs, safe drinking water, and recommended ration pack counts for three days.',
      localNotice: 'Calculated directly in your browser. Zero information is stored or sent.',
      householdTitle: 'Household Composition',
      adultsLabel: 'Adults & Teens (13+)',
      childrenLabel: 'Children (1–12 yrs)',
      infantsLabel: 'Infants (<12 mos)',
      pregnantLabel: 'Pregnant or Lactating',
      dietAndFuelTitle: 'Dietary Needs & Cooking Access',
      fuelNoHeat: 'No Power / No Heat Available',
      fuelCanBoil: 'Can Boil Water Safely',
      resultsTitle: '72-Hour Supply Estimate',
      totalEnergyLabel: '72-Hour Energy Need',
      drinkingWaterLabel: 'Drinking Water (72h)',
      prepWaterLabel: 'Food & Hygiene Water',
      recommendedPacksTitle: 'Recommended Pickup Allocation',
      downloadChecklist: 'Download Text Checklist',
      printPlan: 'Print Supply Card',
    },
    safety: {
      heading: 'Safe Preparation & Water Purification Guide',
      subheading:
        'Clear, verified steps for boiling water, disinfecting non-potable supplies, protecting infant formula, and triaging refrigerated food.',
      waterTitle: 'Emergency Water Disinfection',
      waterVolumeLabel: 'Select Water Container Volume',
      boilProtocolTitle: 'Rolling Boil Protocol',
      bleachProtocolTitle: 'Unscented Chlorine Bleach (5–6% NaOCl)',
      startTimer: 'Start 1-Min Boil Timer',
      resetTimer: 'Reset Timer',
      timerRunning: 'Maintain full rolling boil',
      timerDone: 'Safe boil time complete — let cool covered',
      triageTitle: 'Power Outage Food Safety Triage',
      infantTitle: 'Infant Feeding & Oral Rehydration Safety',
    },
    footer: {
      privacyNote: 'NutriReady operates with zero tracking cookies, zero accounts, and full offline print support.',
      printSummary: 'Print Emergency Summary',
    },
  },
  es: {
    nav: {
      overview: 'Inicio',
      rations: 'Raciones',
      planner: 'Planificador',
      safety: 'Guía Segura',
    },
    guarantee: {
      commitmentPrimary: 'La comida de emergencia nunca depende de un registro.',
      commitmentSecondary: 'Sin nombres. Sin datos personales.',
      offlineAction: 'Tarjeta Sin Red',
    },
    overview: {
      heroTitle: 'Acceso digno a alimentos y agua limpia, listo al llegar.',
      heroSubtitle:
        'Consulta centros comunitarios abiertos, revisa raciones seguras por alergias o dieta y calcula hidratación familiar para 72 horas sin dar datos personales.',
      searchPlaceholder: 'Filtrar por barrio, parada o calle...',
      browseRationsCta: 'Ver Raciones',
      openPlannerCta: 'Planificador 72h',
      kpiHubsOpen: 'Centros Abiertos',
      kpiDailyMeals: 'Comidas Disponibles Hoy',
      kpiBoilZones: 'Avisos de Hervir Agua',
      kpiInfantPacks: 'Lotes Infantiles',
      hubsHeading: 'Centros Comunitarios de Distribución',
      hubsSubheading: 'Atención directa sin filas de registro, acceso sin escalones y apoyo multilingüe.',
      filterAll: 'Todos',
      filterOpenNow: 'Abiertos Ahora',
      filterStepFree: 'Acceso Sin Escalones',
      filterInfantStock: 'Lotes Infantiles',
      inspectRations: 'Ver Raciones Disponibles',
      noHubMatches: 'Ningún centro coincide con los filtros actuales.',
      resetFilters: 'Mostrar Todos',
    },
    rations: {
      heading: 'Raciones de Emergencia y Especificaciones Dietéticas',
      subheading: 'Cada paquete detalla calorías, requisitos de preparación y control de alérgenos.',
      searchPlaceholder: 'Buscar por nombre, ingrediente o alérgeno...',
      allDiets: 'Todas las Dietas',
      noCookFilter: 'Sin Cocción',
      boilWaterFilter: 'Requiere Agua Hervida',
      viewPrepGuide: 'Guía Nutricional y Uso',
      closeDetail: 'Cerrar Guía',
      prepStepsTitle: 'Pasos de Preparación Segura',
      allergenTitle: 'Verificación Dietética y Alérgenos',
      availableAtTitle: 'Disponible Actualmente En',
      noRationMatches: 'No hay raciones que coincidan con los filtros seleccionados.',
    },
    planner: {
      heading: 'Planificador Familiar de Nutrición y Agua (72 Horas)',
      subheading: 'Calcula energía diaria, agua potable y paquetes recomendados para tres días.',
      localNotice: 'Calculado en tu dispositivo. No se guarda ni envía ningún dato.',
      householdTitle: 'Composición del Hogar',
      adultsLabel: 'Adultos y Jóvenes (13+)',
      childrenLabel: 'Niños (1–12 años)',
      infantsLabel: 'Lactantes (<12 meses)',
      pregnantLabel: 'Embarazo o Lactancia',
      dietAndFuelTitle: 'Dieta y Acceso a Calor',
      fuelNoHeat: 'Sin Electricidad ni Estufa',
      fuelCanBoil: 'Puedo Hervir Agua',
      resultsTitle: 'Estimación para 72 Horas',
      totalEnergyLabel: 'Energía Necesaria (72h)',
      drinkingWaterLabel: 'Agua para Beber (72h)',
      prepWaterLabel: 'Agua para Preparación',
      recommendedPacksTitle: 'Asignación Recomendada',
      downloadChecklist: 'Descargar Lista (.txt)',
      printPlan: 'Imprimir Tarjeta',
    },
    safety: {
      heading: 'Guía de Preparación Segura y Purificación de Agua',
      subheading: 'Instrucciones claras para hervir agua, desinfectar reservas, proteger fórmula infantil y revisar alimentos tras cortes eléctricos.',
      waterTitle: 'Desinfección de Agua de Emergencia',
      waterVolumeLabel: 'Selecciona el Volumen del Recipiente',
      boilProtocolTitle: 'Protocolo de Ebullición',
      bleachProtocolTitle: 'Cloro Doméstico Sin Aroma (5–6% NaOCl)',
      startTimer: 'Iniciar Temporizador (1 Min)',
      resetTimer: 'Reiniciar',
      timerRunning: 'Mantén hervor constante',
      timerDone: 'Tiempo seguro completo — deja enfriar tapado',
      triageTitle: 'Seguridad Alimentaria Tras Corte Eléctrico',
      infantTitle: 'Alimentación Infantil y Rehidratación Oral',
    },
    footer: {
      privacyNote: 'NutriReady funciona sin cookies de rastreo, sin cuentas y con impresión sin conexión.',
      printSummary: 'Imprimir Resumen',
    },
  },
  ar: {
    nav: {
      overview: 'نظرة عامة',
      rations: 'الحصص الغذائية',
      planner: 'مخطط 72 ساعة',
      safety: 'دليل السلامة',
    },
    guarantee: {
      commitmentPrimary: 'الغذاء الطارئ غير مشروط بالتسجيل إطلاقاً.',
      commitmentSecondary: 'بلا أسماء. بلا بيانات شخصية.',
      offlineAction: 'بطاقة دون إنترنت',
    },
    overview: {
      heroTitle: 'غذاء كريم ومياه نظيفة جاهزة فور وصولك.',
      heroSubtitle:
        'تحقق من مراكز التوزيع المفتوحة، وافحص الحصص المناسبة للحساسية والأنظمة الغذائية، واحسب احتياجات أسرتك لـ 72 ساعة دون إدخال أي بيانات شخصية.',
      searchPlaceholder: 'تصفية حسب الحي أو المحطة أو الشارع...',
      browseRationsCta: 'تصفح الحصص الغذائية',
      openPlannerCta: 'حاسبة 72 ساعة',
      kpiHubsOpen: 'مراكز مفتوحة الآن',
      kpiDailyMeals: 'وجبات متاحة اليوم',
      kpiBoilZones: 'تنبيهات غلي الماء',
      kpiInfantPacks: 'حصص الرضع والأنظمة الخاصة',
      hubsHeading: 'مراكز التوزيع المجتمعية النشطة',
      hubsSubheading: 'استلام مباشر دون تسجيل، مع ممرات ميسرة ومتطوعين متعددي اللغات.',
      filterAll: 'جميع المراكز',
      filterOpenNow: 'مفتوح الآن',
      filterStepFree: 'وصول ميسر',
      filterInfantStock: 'حصص رضع متوفرة',
      inspectRations: 'فحص الحصص المتوفرة',
      noHubMatches: 'لا توجد مراكز مطابقة للتصفية الحالية.',
      resetFilters: 'عرض جميع المراكز',
    },
    rations: {
      heading: 'الحصص الطارئة والمواصفات الغذائية',
      subheading: 'توضح كل حصة القيم الحرارية ومتطلبات التحضير والتحقق من مسببات الحساسية.',
      searchPlaceholder: 'ابحث باسم الوجبة أو المكون أو الحساسية...',
      allDiets: 'جميع الأنظمة',
      noCookFilter: 'جاهز دون طهي',
      boilWaterFilter: 'يتطلب ماءً مغلياً',
      viewPrepGuide: 'التغذية وطريقة التحضير',
      closeDetail: 'إغلاق الدليل',
      prepStepsTitle: 'خطوات التحضير الآمن',
      allergenTitle: 'التحقق الغذائي ومسببات الحساسية',
      availableAtTitle: 'متوفر حالياً في',
      noRationMatches: 'لا توجد حصص مطابقة للخيارات المحددة.',
    },
    planner: {
      heading: 'مخطط التغذية والمياه للأسرة (72 ساعة)',
      subheading: 'احسب السعرات الحرارية ومياه الشرب الآمنة وعدد الحصص الموصى بها لثلاثة أيام.',
      localNotice: 'يتم الحساب محلياً على جهازك فقط. لا يتم حفظ أو إرسال أي بيانات.',
      householdTitle: 'أفراد الأسرة',
      adultsLabel: 'البالغون واليافعون (+13)',
      childrenLabel: 'الأطفال (1–12 سنة)',
      infantsLabel: 'الرضع (أقل من 12 شهراً)',
      pregnantLabel: 'حامل أو مرضع',
      dietAndFuelTitle: 'الاحتياجات الغذائية والوقود',
      fuelNoHeat: 'لا تتوفر كهرباء أو حرارة',
      fuelCanBoil: 'يمكن غلي الماء بأمان',
      resultsTitle: 'تقدير احتياجات 72 ساعة',
      totalEnergyLabel: 'الطاقة المطلوبة (72 ساعة)',
      drinkingWaterLabel: 'مياه الشرب (72 ساعة)',
      prepWaterLabel: 'مياه التحضير والنظافة',
      recommendedPacksTitle: 'توزيع الحصص الموصى به',
      downloadChecklist: 'تنزيل القائمة النصية',
      printPlan: 'طباعة بطاقة الإمداد',
    },
    safety: {
      heading: 'دليل التحضير الآمن وتنقية المياه',
      subheading: 'خطوات واضحة لغلي الماء وتعقيم الإمدادات وحماية حليب الرضع وفحص الأغذية عند انقطاع الكهرباء.',
      waterTitle: 'تعقيم المياه في الطوارئ',
      waterVolumeLabel: 'اختر سعة الوعاء',
      boilProtocolTitle: 'بروتوكول الغلي الكامل',
      bleachProtocolTitle: 'الكلور المنزلي غير المعطر (5–6%)',
      startTimer: 'بدء مؤقت الغلي (دقيقة واحدة)',
      resetTimer: 'إعادة الضبط',
      timerRunning: 'حافظ على الغليان المستمر',
      timerDone: 'اكتمل وقت الغلي الآمن — اتركه يبرد مغطى',
      triageTitle: 'سلامة الغذاء عند انقطاع الكهرباء',
      infantTitle: 'تغذية الرضع ومحلول معالجة الجفاف',
    },
    footer: {
      privacyNote: 'يعمل NutriReady دون ملفات تتبع أو حسابات وبإمكانية طباعة كاملة دون اتصال.',
      printSummary: 'طباعة الملخص الطارئ',
    },
  },
  vi: {
    nav: {
      overview: 'Tổng quan',
      rations: 'Khẩu phần',
      planner: 'Lập kế hoạch',
      safety: 'Hướng dẫn an toàn',
    },
    guarantee: {
      commitmentPrimary: 'Thực phẩm khẩn cấp không bao giờ yêu cầu đăng ký.',
      commitmentSecondary: 'Không tên. Không dữ liệu cá nhân.',
      offlineAction: 'Thẻ Ngoại Tuyến',
    },
    overview: {
      heroTitle: 'Tiếp cận thực phẩm và nước sạch trang trọng, sẵn sàng khi bạn đến.',
      heroSubtitle:
        'Kiểm tra điểm phân phối mở cửa, xem thành phần dinh dưỡng và dị ứng của từng khẩu phần, và tính nhu cầu nước 72 giờ mà không cần cung cấp thông tin cá nhân.',
      searchPlaceholder: 'Lọc theo khu vực, trạm xe hoặc tên đường...',
      browseRationsCta: 'Xem Khẩu Phần',
      openPlannerCta: 'Tính Nhu Cầu 72 Giờ',
      kpiHubsOpen: 'Điểm Đang Mở',
      kpiDailyMeals: 'Suất Ăn Sẵn Hôm Nay',
      kpiBoilZones: 'Cảnh Báo Đun Sôi Nước',
      kpiInfantPacks: 'Gói Cho Trẻ Sơ Sinh',
      hubsHeading: 'Các Điểm Phân Phối Cộng Đồng',
      hubsSubheading: 'Nhận trực tiếp không cần giấy tờ, lối đi không bậc thang và tình nguyện viên đa ngôn ngữ.',
      filterAll: 'Tất cả',
      filterOpenNow: 'Đang mở',
      filterStepFree: 'Lối đi bằng phẳng',
      filterInfantStock: 'Có gói trẻ em',
      inspectRations: 'Xem khẩu phần tại điểm',
      noHubMatches: 'Không có điểm phân phối nào khớp bộ lọc hiện tại.',
      resetFilters: 'Hiện tất cả',
    },
    rations: {
      heading: 'Khẩu Phần Khẩn Cấp & Thông Tin Dinh Dưỡng',
      subheading: 'Mỗi gói đều ghi rõ năng lượng, cách chế biến và cảnh báo dị ứng trước khi nhận.',
      searchPlaceholder: 'Tìm theo tên món, thành phần hoặc chất gây dị ứng...',
      allDiets: 'Mọi chế độ ăn',
      noCookFilter: 'Ăn liền không cần nấu',
      boilWaterFilter: 'Cần nước đun sôi',
      viewPrepGuide: 'Dinh dưỡng & Cách dùng',
      closeDetail: 'Đóng hướng dẫn',
      prepStepsTitle: 'Các bước chế biến an toàn',
      allergenTitle: 'Kiểm tra chế độ ăn & Dị ứng',
      availableAtTitle: 'Hiện có sẵn tại',
      noRationMatches: 'Không có khẩu phần phù hợp với bộ lọc đã chọn.',
    },
    planner: {
      heading: 'Công Cụ Tính Dinh Dưỡng & Nước 72 Giờ Cho Gia Đình',
      subheading: 'Ước tính năng lượng, nước uống an toàn và số gói khẩu phần khuyên dùng trong 3 ngày.',
      localNotice: 'Tính trực tiếp trên thiết bị của bạn. Không lưu trữ hay gửi dữ liệu.',
      householdTitle: 'Thành phần gia đình',
      adultsLabel: 'Người lớn & Thiếu niên (13+)',
      childrenLabel: 'Trẻ em (1–12 tuổi)',
      infantsLabel: 'Trẻ sơ sinh (<12 tháng)',
      pregnantLabel: 'Phụ nữ mang thai / cho con bú',
      dietAndFuelTitle: 'Chế độ ăn & Nguồn nhiệt',
      fuelNoHeat: 'Không có điện / bếp',
      fuelCanBoil: 'Có thể đun sôi nước an toàn',
      resultsTitle: 'Ước tính nguồn cung 72 giờ',
      totalEnergyLabel: 'Tổng năng lượng (72h)',
      drinkingWaterLabel: 'Nước uống (72h)',
      prepWaterLabel: 'Nước pha chế & vệ sinh',
      recommendedPacksTitle: 'Gợi ý phân bổ khẩu phần',
      downloadChecklist: 'Tải danh sách (.txt)',
      printPlan: 'In thẻ dự phòng',
    },
    safety: {
      heading: 'Hướng Dẫn Chế Biến An Toàn & Làm Sạch Nước',
      subheading: 'Quy trình rõ ràng để đun sôi nước, khử trùng nước sinh hoạt, bảo vệ sữa công thức và kiểm tra thực phẩm khi mất điện.',
      waterTitle: 'Khử trùng nước khẩn cấp',
      waterVolumeLabel: 'Chọn dung tích bình chứa',
      boilProtocolTitle: 'Quy trình đun sôi sùng sục',
      bleachProtocolTitle: 'Dung dịch Clo không mùi (5–6% NaOCl)',
      startTimer: 'Bắt đầu đếm 1 phút sôi',
      resetTimer: 'Đặt lại',
      timerRunning: 'Giữ nước sôi liên tục',
      timerDone: 'Đã đủ thời gian đun sôi an toàn — đậy nắp để nguội',
      triageTitle: 'Phân loại thực phẩm khi mất điện',
      infantTitle: 'Dinh dưỡng trẻ sơ sinh & Bù nước đường uống',
    },
    footer: {
      privacyNote: 'NutriReady hoạt động không cookie theo dõi, không tài khoản và hỗ trợ in ngoại tuyến.',
      printSummary: 'In tóm tắt khẩn cấp',
    },
  },
  fr: {
    nav: {
      overview: 'Aperçu',
      rations: 'Rations',
      planner: 'Planificateur',
      safety: 'Guide Sécurité',
    },
    guarantee: {
      commitmentPrimary: "L'aide alimentaire d'urgence n'est jamais conditionnée à une inscription.",
      commitmentSecondary: 'Aucun nom. Aucune donnée personnelle.',
      offlineAction: 'Fiche Hors-Ligne',
    },
    overview: {
      heroTitle: 'Accès digne aux vivres et à l’eau potable, prêt dès votre arrivée.',
      heroSubtitle:
        'Consultez les points de distribution ouverts, vérifiez les rations sans allergènes et calculez vos besoins familiaux sur 72 heures sans aucune donnée personnelle.',
      searchPlaceholder: 'Filtrer par quartier, arrêt ou rue...',
      browseRationsCta: 'Parcourir les Rations',
      openPlannerCta: 'Calculateur 72h',
      kpiHubsOpen: 'Points Ouverts',
      kpiDailyMeals: 'Repas Disponibles',
      kpiBoilZones: 'Avis d’Ébullition',
      kpiInfantPacks: 'Lots Nourrissons',
      hubsHeading: 'Points de Distribution Communautaires',
      hubsSubheading: 'Accueil sans inscription, accès de plain-pied et équipes multilingues sur place.',
      filterAll: 'Tous',
      filterOpenNow: 'Ouverts',
      filterStepFree: 'Accès Plain-Pied',
      filterInfantStock: 'Lots Nourrissons',
      inspectRations: 'Voir les Rations en Stock',
      noHubMatches: 'Aucun point de distribution ne correspond à votre recherche.',
      resetFilters: 'Tout Afficher',
    },
    rations: {
      heading: 'Rations d’Urgence et Spécifications Diététiques',
      subheading: 'Chaque lot précise l’apport calorique, le mode de préparation et le contrôle allergènes.',
      searchPlaceholder: 'Rechercher par nom, ingrédient ou allergène...',
      allDiets: 'Tous Régimes',
      noCookFilter: 'Prêt Sans Cuisson',
      boilWaterFilter: 'Eau Bouillie Requise',
      viewPrepGuide: 'Nutrition & Préparation',
      closeDetail: 'Fermer',
      prepStepsTitle: 'Étapes de Préparation Sûre',
      allergenTitle: 'Vérification Diététique & Allergènes',
      availableAtTitle: 'Disponible Actuellement À',
      noRationMatches: 'Aucune ration ne correspond aux filtres sélectionnés.',
    },
    planner: {
      heading: 'Planificateur Familial Nutrition & Eau (72 Heures)',
      subheading: 'Estimez l’apport énergétique, l’eau potable et le nombre de lots recommandés pour trois jours.',
      localNotice: 'Calculé localement sur votre appareil. Aucune donnée conservée ni transmise.',
      householdTitle: 'Composition du Foyer',
      adultsLabel: 'Adultes & Ados (13+)',
      childrenLabel: 'Enfants (1–12 ans)',
      infantsLabel: 'Nourrissons (<12 mois)',
      pregnantLabel: 'Enceinte ou Allaitante',
      dietAndFuelTitle: 'Régimes & Moyen de Chauffe',
      fuelNoHeat: 'Sans Électricité ni Réchaud',
      fuelCanBoil: 'Ébullition d’Eau Possible',
      resultsTitle: 'Estimation pour 72 Heures',
      totalEnergyLabel: 'Énergie Requise (72h)',
      drinkingWaterLabel: 'Eau de Boisson (72h)',
      prepWaterLabel: 'Eau Préparation & Hygiène',
      recommendedPacksTitle: 'Dotation Recommandée',
      downloadChecklist: 'Télécharger Liste (.txt)',
      printPlan: 'Imprimer Fiche',
    },
    safety: {
      heading: 'Guide de Préparation Sûre & Purification de l’Eau',
      subheading: 'Instructions vérifiées pour faire bouillir l’eau, désinfecter les réserves, sécuriser les biberons et trier les aliments sans électricité.',
      waterTitle: 'Désinfection d’Urgence de l’Eau',
      waterVolumeLabel: 'Volume du Récipient',
      boilProtocolTitle: 'Protocole d’Ébullition',
      bleachProtocolTitle: 'Eau de Javel Non Parfumée (5–6% NaOCl)',
      startTimer: 'Lancer Minuteur 1 Min',
      resetTimer: 'Réinitialiser',
      timerRunning: 'Maintenir une franche ébullition',
      timerDone: 'Ébullition terminée — laisser refroidir couvert',
      triageTitle: 'Tri Alimentaire Après Coupure de Courant',
      infantTitle: 'Alimentation Infantile & Réhydratation Orale',
    },
    footer: {
      privacyNote: 'NutriReady fonctionne sans cookies de suivi, sans compte et reste imprimable hors-ligne.',
      printSummary: 'Imprimer Résumé d’Urgence',
    },
  },
};
