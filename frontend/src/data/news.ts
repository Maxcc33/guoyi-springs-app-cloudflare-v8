export interface NewsItem {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  date: string;
  category: {
    zh: string;
    en: string;
  };
  image: string;
  summary: {
    zh: string;
    en: string;
  };
  content: {
    zh: string[];
    en: string[];
  };
}

export const newsData: NewsItem[] = [
  {
    id: '1',
    title: {
      zh: '国益弹簧参加2024年上海国际工业博览会',
      en: 'Guoyi Spring Participated in 2024 Shanghai International Industry Fair',
    },
    date: '2024-11-15',
    category: {
      zh: '展会活动',
      en: 'Exhibition',
    },
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/224a81c4-ddf2-43ac-9b4a-85b5904ae1a5.png',
    summary: {
      zh: '我公司携最新研发的高精度不锈钢弹簧产品亮相上海工博会,吸引了众多国内外客户前来咨询洽谈,展会期间达成多项合作意向。',
      en: 'Our company showcased the latest high-precision stainless steel spring products at Shanghai Industry Fair, attracting numerous domestic and international customers for consultation and negotiation, reaching multiple cooperation intentions during the exhibition.',
    },
    content: {
      zh: [
        '2024年11月15日至19日，第26届中国国际工业博览会在上海国家会展中心隆重举行。作为国内领先的不锈钢弹簧制造商，国益弹簧携最新研发的高精度不锈钢弹簧产品精彩亮相。',
        '本次展会，我公司展示了包括304不锈钢压簧、316不锈钢拉簧、扭簧、异形弹簧等多个系列的精密弹簧产品。这些产品广泛应用于医疗器械、汽车配件、电子电器、工业设备等领域，以其卓越的品质和精密的工艺吸引了众多国内外客户的关注。',
        '展会期间，我公司展位人流如织，来自德国、日本、美国、韩国等国家的采购商纷纷前来咨询洽谈。技术团队详细介绍了产品的材质特性、生产工艺和质量控制体系，获得了客户的高度认可。',
        '通过本次展会，国益弹簧成功与多家知名企业达成合作意向，签订了多份意向订单。这不仅展示了公司的技术实力和产品优势，也为未来的国际化发展奠定了坚实基础。',
        '国益弹簧将继续秉承"品质第一、客户至上"的经营理念，不断提升产品质量和服务水平，为全球客户提供更优质的不锈钢弹簧解决方案。',
      ],
      en: [
        'From November 15 to 19, 2024, the 26th China International Industry Fair was grandly held at the Shanghai National Exhibition and Convention Center. As a leading domestic stainless steel spring manufacturer, Guoyi Spring showcased its latest high-precision stainless steel spring products.',
        'At this exhibition, our company displayed multiple series of precision spring products including 304 stainless steel compression springs, 316 stainless steel tension springs, torsion springs, and special-shaped springs. These products are widely used in medical devices, auto parts, electronics, industrial equipment, and other fields, attracting numerous domestic and international customers with their excellent quality and precision craftsmanship.',
        'During the exhibition, our booth was crowded with visitors. Purchasers from Germany, Japan, the United States, South Korea, and other countries came to consult and negotiate. The technical team provided detailed introductions about material characteristics, production processes, and quality control systems, receiving high recognition from customers.',
        'Through this exhibition, Guoyi Spring successfully reached cooperation intentions with multiple well-known enterprises and signed several intention orders. This not only demonstrated the company\'s technical strength and product advantages but also laid a solid foundation for future international development.',
        'Guoyi Spring will continue to uphold the business philosophy of "Quality First, Customer Supreme," continuously improving product quality and service levels to provide better stainless steel spring solutions for global customers.',
      ],
    },
  },
  {
    id: '2',
    title: {
      zh: '新增自动化生产线投入使用 产能提升30%',
      en: 'New Automated Production Line Put into Use, Capacity Increased by 30%',
    },
    date: '2024-10-20',
    category: {
      zh: '公司新闻',
      en: 'Company News',
    },
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/6016bdc6-9c54-4eb6-9e75-f7e96c1cc3d2.png',
    summary: {
      zh: '为满足市场日益增长的需求,公司投资引进了两条全自动弹簧生产线,大幅提升了生产效率和产品质量,年产能突破6000万件。',
      en: 'To meet the growing market demand, the company invested in two fully automated spring production lines, significantly improving production efficiency and product quality, with annual capacity exceeding 60 million pieces.',
    },
    content: {
      zh: [
        '2024年10月20日，国益弹簧新引进的两条全自动弹簧生产线正式投入使用，标志着公司生产能力迈上了新台阶。',
        '此次引进的自动化生产线采用国际先进的CNC弹簧成型技术，具有高精度、高效率、低能耗的特点。生产线配备了智能检测系统，可实现产品质量的实时监控和自动分拣，大幅降低了人工成本和不良品率。',
        '新生产线投入使用后，公司整体产能提升了30%，年产能突破6000万件。同时，产品的一致性和稳定性也得到了显著提升，完全满足高端客户对产品质量的严格要求。',
        '公司技术总监表示："这次设备升级是公司智能制造战略的重要一步。通过引进先进的自动化设备，我们不仅提高了生产效率，更重要的是提升了产品的精度和一致性，为客户创造更大的价值。"',
        '未来，国益弹簧将继续加大技术研发和设备投入，推进智能化、数字化转型，打造行业领先的智能制造工厂，为客户提供更优质的产品和服务。',
      ],
      en: [
        'On October 20, 2024, two newly introduced fully automated spring production lines at Guoyi Spring were officially put into use, marking a new milestone in the company\'s production capacity.',
        'The newly introduced automated production lines adopt internationally advanced CNC spring forming technology, featuring high precision, high efficiency, and low energy consumption. The production lines are equipped with intelligent detection systems that enable real-time monitoring of product quality and automatic sorting, significantly reducing labor costs and defect rates.',
        'After the new production lines were put into use, the company\'s overall capacity increased by 30%, with annual capacity exceeding 60 million pieces. At the same time, product consistency and stability have been significantly improved, fully meeting the strict quality requirements of high-end customers.',
        'The company\'s Technical Director stated: "This equipment upgrade is an important step in the company\'s intelligent manufacturing strategy. By introducing advanced automation equipment, we have not only improved production efficiency but more importantly enhanced product precision and consistency, creating greater value for customers."',
        'In the future, Guoyi Spring will continue to increase investment in technology R&D and equipment, promote intelligent and digital transformation, build an industry-leading smart manufacturing factory, and provide customers with better products and services.',
      ],
    },
  },
  {
    id: '3',
    title: {
      zh: '国益弹簧获得ISO9001质量管理体系认证',
      en: 'Guoyi Spring Obtained ISO9001 Quality Management System Certification',
    },
    date: '2024-09-10',
    category: {
      zh: '企业荣誉',
      en: 'Company Honor',
    },
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/36fec825-a6f9-4300-b09d-09ffe15e87b9.png',
    summary: {
      zh: '经过严格的审核和评估,我公司顺利通过ISO9001质量管理体系认证,标志着公司质量管理水平达到国际标准,为客户提供更可靠的产品保障。',
      en: 'After rigorous auditing and evaluation, our company successfully passed ISO9001 quality management system certification, marking that the company\'s quality management level has reached international standards, providing more reliable product assurance for customers.',
    },
    content: {
      zh: [
        '2024年9月10日，国益弹簧正式获得ISO9001:2015质量管理体系认证证书。这是对公司多年来坚持质量管理、追求卓越品质的充分肯定。',
        'ISO9001是国际标准化组织制定的质量管理体系标准，是全球公认的质量管理最佳实践。获得此项认证，标志着国益弹簧的质量管理体系已达到国际先进水平。',
        '为获得此项认证，公司历时一年多进行了全面的质量管理体系建设和优化。从原材料采购、生产过程控制、产品检验到售后服务，每个环节都建立了严格的标准和流程。',
        '认证审核组对公司的质量方针、质量目标、文件控制、过程管理、持续改进等方面进行了全面审核，对公司的质量管理水平给予了高度评价。',
        '公司总经理表示："获得ISO9001认证是我们质量管理工作的一个里程碑，但这不是终点，而是新的起点。我们将以此为契机，持续改进质量管理体系，不断提升产品质量，为客户提供更可靠的产品保障。"',
      ],
      en: [
        'On September 10, 2024, Guoyi Spring officially obtained the ISO9001:2015 Quality Management System certification. This is a full affirmation of the company\'s years of commitment to quality management and pursuit of excellent quality.',
        'ISO9001 is a quality management system standard developed by the International Organization for Standardization and is globally recognized as the best practice for quality management. Obtaining this certification marks that Guoyi Spring\'s quality management system has reached an internationally advanced level.',
        'To obtain this certification, the company spent more than a year conducting comprehensive quality management system construction and optimization. From raw material procurement, production process control, product inspection to after-sales service, strict standards and procedures have been established for each link.',
        'The certification audit team conducted a comprehensive audit of the company\'s quality policy, quality objectives, document control, process management, continuous improvement, and other aspects, giving high praise to the company\'s quality management level.',
        'The company\'s General Manager stated: "Obtaining ISO9001 certification is a milestone in our quality management work, but this is not the end, but a new starting point. We will take this opportunity to continuously improve the quality management system, constantly enhance product quality, and provide customers with more reliable product assurance."',
      ],
    },
  },
  {
    id: '4',
    title: {
      zh: '不锈钢弹簧在医疗器械中的应用：316不锈钢弹簧的优势与典型案例',
      en: 'Applications of Stainless Steel Springs in Medical Devices: Advantages and Typical Cases of 316 Stainless Steel Springs',
    },
    date: '2024-08-25',
    category: {
      zh: '行业资讯',
      en: 'Industry News',
    },
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/d31cc2d7-7d1d-45cb-afcc-16807cfc5305.png',
    summary: {
      zh: '本文详细介绍了304/316不锈钢弹簧在医疗器械中的应用,包括手术器械、注射器、医疗床等,分析了不锈钢弹簧在医疗领域的优势和技术要求。',
      en: 'This article introduces in detail the application of 304/316 stainless steel springs in medical devices, including surgical instruments, syringes, medical beds, etc., analyzing the advantages and technical requirements of stainless steel springs in the medical field.',
    },
    content: {
      zh: [
        '不锈钢弹簧凭借优异的耐腐蚀性、生物相容性和高疲劳寿命，已成为医疗器械领域不可或缺的核心组件。特别是在需要反复使用、灭菌处理或接触体液的环境中，316不锈钢弹簧（或316L）因其更高的抗点蚀能力和氯离子耐受性，成为主流选择。本文将详细分析不锈钢弹簧在医疗器械中的典型应用场景，帮助工程师和采购人员更好地选型。',
        '一、手术器械中的不锈钢弹簧应用',
        '手术剪、止血钳、持针器、缝合器等精密手术器械中，大量采用不锈钢弹簧（主要是压缩簧、扭簧或拉簧）。这些弹簧负责提供弹性复位、夹持力和操作反馈，必须在数万次开合后仍保持稳定手感和零失效。'，
        '为什么首选316不锈钢？',
        ' -优异的耐腐蚀性：手术环境常涉及生理盐水、血液和高压蒸汽灭菌，316不锈钢的钼（Mo）元素显著提升抗点蚀能力（PREN值约24-26）。\n -生物相容性高：符合ISO 10993标准，不易释放有害离子。\n -疲劳寿命长：冷加工后强度可达1300-1800 MPa，适合高频使用。'，
        '实际案例：许多高端手术器械供应商使用316不锈钢弹簧确保器械在反复灭菌后仍可靠，减少维护成本。',
        '二、注射器与输液设备中的不锈钢弹簧\n关键材料选择：',
        '一次性注射器、安全针回缩机制、胰岛素笔、输液泵的压力调节簧和控制簧等，都依赖不锈钢弹簧实现精确剂量控制和可靠复位。这些弹簧需满足严格的生物相容性和清洁度要求，避免污染药物或人体。',
        ' -316不锈钢弹簧是主流选项，因其低磁性（适合MRI兼容设备）、易清洁和耐氯离子腐蚀。\n -线径通常在0.1-1.0mm范围，支持微型化设计。',
        '这类应用强调无菌和一次性，不锈钢弹簧的耐疲劳性能确保推杆或阀门在多次激活后不失效。',
        '三、医疗床与康复设备中的不锈钢弹簧',
        '电动医疗床的升降机构、侧护栏调节、康复训练器的阻力调节装置和患者抬升系统，常使用高强度不锈钢弹簧（压缩簧或恒力簧）。这些弹簧需承受频繁负载变化（数万至数十万次循环），并保持长期稳定性。',
        '材料优势：',
        ' -316不锈钢或17-7PH（高强度型）提供优秀疲劳寿命和耐腐蚀性。\n -支持大负载：强度高、体积小，适合空间受限的设计。',
        '实际场景：医院电动床和轮椅辅助装置中，不锈钢弹簧确保安全升降，减少机械故障风险。',
        '四、植入式医疗器械中的不锈钢弹簧应用',
        '心脏瓣膜辅助装置、某些骨科固定器、神经刺激器接触簧或血管支架的自膨胀机制等植入式设备，也会涉及微型不锈钢弹簧。这类应用对材料的生物相容性、耐腐蚀性和疲劳性能要求最高。',
        '首选材料：',
        ' -316LVM（真空熔炼316L）或316L，符合ASTM F138/F139标准。\n -低碳设计减少敏化风险，确保长期植入安全。',
        '注意：植入级不锈钢弹簧需通过严格的FDA/NMPA注册和生物相容性测试。',
        '不锈钢弹簧在医疗器械中的选材建议',
        ' -腐蚀/灭菌环境优先：首选316不锈钢弹簧（或316L），耐氯离子和酸性介质。\n -高疲劳/高强度需求：考虑17-7PH不锈钢，强度可提升50%以上。\n -微型/精密要求：线径0.1-2.0mm，支持定制公差±0.01mm。\n -认证参考：优先符合ISO 13485、ISO 10993、ASTM A313标准的材料。',
        '不锈钢弹簧在医疗器械领域的应用正随着微创技术和智能设备的发展而不断扩展。如果你正在设计或采购医疗级弹簧，建议结合具体工况（如温度、介质、循环次数）进行疲劳测试和盐雾验证，以确保长期可靠性。',
        '国益弹簧专注于医疗级不锈钢弹簧的研发和生产，产品已通过多项医疗器械相关认证，为众多医疗器械企业提供可靠的弹簧解决方案。',
      ],
      en: [
        'Stainless steel springs, with their excellent corrosion resistance, biocompatibility, and long fatigue life, have become an indispensable core component in the medical device field. Especially in environments requiring repeated use, sterilization, or contact with bodily fluids, 316 stainless steel springs (or 316L) are the mainstream choice due to their superior resistance to pitting corrosion and chloride ion tolerance. This article will analyze in detail the typical application scenarios of stainless steel springs in medical devices to help engineers and purchasing personnel make better selections.',
        'I. Application of stainless steel springs in surgical instruments\nStainless steel springs (mainly compression springs, torsion springs, or tension springs) are widely used in precision surgical instruments such as surgical scissors, hemostatic forceps, needle holders, and suture devices. These springs are responsible for providing elastic reset, clamping force, and operational feedback, and must maintain a stable feel and zero failure rate after tens of thousands of opening and closing cycles.',
        'II. Syringes and Infusion Equipment\nThe plunger return springs of disposable syringes and control springs of infusion pumps are made of stainless steel. These springs need to meet strict biocompatibility requirements to ensure no adverse effects on the human body.',
        'III. Medical Beds and Rehabilitation Equipment\nThe lifting mechanisms of electric medical beds and resistance adjustment devices of rehabilitation training equipment all require high-strength, long-life stainless steel springs. These springs need to withstand frequent load changes and have high requirements for fatigue life.',
        'IV. Implantable Medical Devices\nStainless steel springs are also used in implantable medical devices such as cardiac stents and orthopedic implants. This type of application has the most stringent requirements for material biocompatibility, corrosion resistance, and mechanical properties.',
        'Guoyi Spring focuses on the R&D and production of medical-grade stainless steel springs. Our products have passed multiple medical device-related certifications and provide reliable spring solutions for numerous medical device companies.',
      ],
    },
  },
  {
    id: '5',
    title: {
      zh: '如何选择合适的不锈钢弹簧材质?',
      en: 'How to Choose the Right Stainless Steel Spring Material?',
    },
    date: '2024-07-15',
    category: {
      zh: '技术文章',
      en: 'Technical Article',
    },
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/41516a01-fcc0-4c7e-8ea4-cfe7d4c49652.png',
    summary: {
      zh: '304和316不锈钢是最常用的弹簧材质,本文从耐腐蚀性、机械性能、成本等方面对比分析,帮助客户根据使用环境选择最合适的材质。',
      en: '304 and 316 stainless steel are the most commonly used spring materials. This article compares and analyzes from the aspects of corrosion resistance, mechanical properties, and cost to help customers choose the most suitable material according to the usage environment.',
    },
    content: {
      zh: [
        '在选择不锈钢弹簧材质时，304和316是最常用的两种材质。本文将从多个维度对比分析这两种材质，帮助您做出正确的选择。',
        '一、材质成分对比\n304不锈钢含有18%的铬和8%的镍，是最通用的不锈钢材质。316不锈钢在304的基础上添加了2-3%的钼，进一步提高了耐腐蚀性能。',
        '二、耐腐蚀性对比\n304不锈钢具有良好的耐腐蚀性，适用于一般环境。316不锈钢由于含有钼元素，对氯离子的耐腐蚀性更强，特别适用于海洋环境、化工设备、医疗器械等对耐腐蚀性要求较高的场合。',
        '三、机械性能对比\n两种材质的机械性能相近，抗拉强度约为520-720MPa。在相同规格下，弹簧的弹性特性基本一致。316不锈钢在高温环境下的性能略优于304。',
        '四、成本对比\n由于316不锈钢含有较贵的钼元素，其价格通常比304高出20-30%。在选择时需要权衡性能需求和成本预算。',
        '五、选择建议\n- 一般室内环境、普通工业应用：选择304不锈钢，性价比更高\n- 海洋环境、化工设备、食品加工：选择316不锈钢，耐腐蚀性更好\n- 医疗器械、植入物：选择316L不锈钢，生物相容性更好\n- 高温环境：选择316不锈钢，高温性能更稳定',
        '国益弹簧可根据客户的具体应用场景，提供专业的材质选择建议和定制化弹簧解决方案。欢迎联系我们的技术团队进行咨询。',
      ],
      en: [
        'When choosing stainless steel spring materials, 304 and 316 are the two most commonly used materials. This article will compare and analyze these two materials from multiple dimensions to help you make the right choice.',
        'I. Material Composition Comparison\n304 stainless steel contains 18% chromium and 8% nickel, making it the most versatile stainless steel material. 316 stainless steel adds 2-3% molybdenum based on 304, further improving corrosion resistance.',
        'II. Corrosion Resistance Comparison\n304 stainless steel has good corrosion resistance and is suitable for general environments. 316 stainless steel, due to its molybdenum content, has stronger resistance to chloride ions and is particularly suitable for marine environments, chemical equipment, medical devices, and other applications with high corrosion resistance requirements.',
        'III. Mechanical Properties Comparison\nThe mechanical properties of the two materials are similar, with tensile strength of about 520-720MPa. Under the same specifications, the elastic characteristics of springs are basically the same. 316 stainless steel performs slightly better than 304 in high-temperature environments.',
        'IV. Cost Comparison\nSince 316 stainless steel contains the more expensive molybdenum element, its price is usually 20-30% higher than 304. When choosing, you need to balance performance requirements and cost budget.',
        'V. Selection Recommendations\n- General indoor environments, ordinary industrial applications: Choose 304 stainless steel for better cost-effectiveness\n- Marine environments, chemical equipment, food processing: Choose 316 stainless steel for better corrosion resistance\n- Medical devices, implants: Choose 316L stainless steel for better biocompatibility\n- High-temperature environments: Choose 316 stainless steel for more stable high-temperature performance',
        'Guoyi Spring can provide professional material selection advice and customized spring solutions based on customers\' specific application scenarios. Welcome to contact our technical team for consultation.',
      ],
    },
  },
  {
    id: '6',
    title: {
      zh: '国益弹簧成功交付大型汽车配件订单',
      en: 'Guoyi Spring Successfully Delivered Large Auto Parts Order',
    },
    date: '2024-06-30',
    category: {
      zh: '客户案例',
      en: 'Customer Case',
    },
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/950291/2026-02-03/48d7dcab-6f1e-4e70-b52c-218ee13cb2cc.png',
    summary: {
      zh: '我公司为某知名汽车零部件企业定制生产的100万件高强度压簧顺利交付,产品质量获得客户高度认可,为后续长期合作奠定了良好基础。',
      en: 'Our company successfully delivered 1 million high-strength compression springs customized for a well-known auto parts company. The product quality was highly recognized by the customer, laying a good foundation for long-term cooperation.',
    },
    content: {
      zh: [
        '2024年6月30日，国益弹簧成功完成了一笔大型汽车配件订单的交付。本次订单为某知名汽车零部件企业定制生产的100万件高强度压簧，产品质量获得客户的高度认可。',
        '本次订单的产品为汽车发动机气门弹簧，对产品的强度、疲劳寿命和尺寸精度有着极高的要求。国益弹簧技术团队与客户进行了深入的技术交流，根据客户的具体需求进行了产品设计和工艺优化。',
        '在生产过程中，公司严格执行质量控制标准，采用先进的检测设备对每批产品进行全面检验。产品的关键指标包括：弹簧刚度公差±3%、自由高度公差±0.1mm、疲劳寿命超过100万次循环。',
        '经过两个月的紧张生产，100万件产品按时交付。客户对产品质量进行了严格的入厂检验，各项指标均符合要求，产品合格率达到99.8%以上。',
        '客户采购经理表示："国益弹簧的产品质量和交付能力给我们留下了深刻印象。产品的一致性非常好，完全满足我们的技术要求。我们期待与国益弹簧建立长期的合作关系。"',
        '本次订单的成功交付，充分展示了国益弹簧在汽车配件领域的技术实力和生产能力，为公司开拓汽车行业市场奠定了坚实基础。',
      ],
      en: [
        'On June 30, 2024, Guoyi Spring successfully completed the delivery of a large auto parts order. This order consisted of 1 million high-strength compression springs customized for a well-known auto parts company, and the product quality was highly recognized by the customer.',
        'The products in this order are automotive engine valve springs, which have extremely high requirements for product strength, fatigue life, and dimensional accuracy. The Guoyi Spring technical team conducted in-depth technical exchanges with the customer and optimized product design and processes according to the customer\'s specific needs.',
        'During the production process, the company strictly implemented quality control standards and used advanced testing equipment to comprehensively inspect each batch of products. Key product indicators include: spring stiffness tolerance ±3%, free height tolerance ±0.1mm, and fatigue life exceeding 1 million cycles.',
        'After two months of intensive production, 1 million products were delivered on time. The customer conducted strict incoming inspection of product quality, all indicators met the requirements, and the product qualification rate reached over 99.8%.',
        'The customer\'s Purchasing Manager stated: "We are deeply impressed by Guoyi Spring\'s product quality and delivery capability. The product consistency is excellent and fully meets our technical requirements. We look forward to establishing a long-term cooperative relationship with Guoyi Spring."',
        'The successful delivery of this order fully demonstrates Guoyi Spring\'s technical strength and production capacity in the auto parts field, laying a solid foundation for the company to expand into the automotive industry market.',
      ],
    },
  },
];
