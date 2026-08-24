import { servicesData as enServices, Service } from "./services";
import { caseStudiesData as enCaseStudies, CaseStudy } from "./case-studies";
import { blogPostsData as enBlogPosts, BlogPost } from "./insights";
import { productsData as enProducts, Product } from "./products";
import { testimonialsData as enTestimonials, Testimonial } from "./testimonials";
import { industriesData as enIndustries, IndustrySolution } from "./industries";

// ============================================================================
// HINDI DATA OVERLAYS
// ============================================================================

export const hiServices: Service[] = enServices.map((service) => {
  if (service.slug === "it-strategy-consulting") {
    return {
      ...service,
      title: "आईटी रणनीति एवं एंटरप्राइज कंसल्टिंग",
      shortDescription:
        "एंटरप्राइज क्लाउड इंफ्रास्ट्रक्चर का आधुनिकीकरण, टेक्नोलॉजी रोडमैप निर्माण और मल्टी-क्लाउड आर्किटेक्चर अनुकूलन।",
      description:
        "हम अग्रणी उद्यमों को लेगेसी इंफ्रास्ट्रक्चर को आधुनिक बनाने, रक्षात्मक बहु-वर्षीय प्रौद्योगिकी रोडमैप तैयार करने और AWS, Azure एवं GCP पर एंटरप्राइज क्लाउड आर्किटेक्चर को अनुकूलित करने में मदद करते हैं।",
    };
  }
  if (service.slug === "web-app-development") {
    return {
      ...service,
      title: "वेब एवं मोबाइल ऐप इंजीनियरिंग",
      shortDescription:
        "Next.js, React और क्लाउड-नेटिव माइक्रोसर्विसेज पर निर्मित उच्च-प्रदर्शन एंटरप्राइज प्लेटफॉर्म।",
      description:
        "हम सब-सेकंड Next.js और React आर्किटेक्चर का उपयोग करके कस्टम एंटरप्राइज वेब पोर्टल, जटिल SaaS प्लेटफॉर्म, क्लाउड-नेटिव माइक्रोसर्विसेज और नेटिव मोबाइल एप्लिकेशन का निर्माण करते हैं।",
    };
  }
  if (service.slug === "digital-marketing") {
    return {
      ...service,
      title: "डिजिटल मार्केटिंग एवं SEO ग्रोथ",
      shortDescription:
        "B2B डिमांड जनरेशन, उच्च-इरादे वाले LinkedIn एवं Google Search अभियान और ROI-संचालित मार्केटिंग।",
      description:
        "हम रणनीतिक B2B डिमांड जनरेशन, लक्षित LinkedIn एवं Google खोज अभियानों और बहु-चैनल रूपांतरण फ़नल मॉडलिंग के माध्यम से व्यवसायों को अपनी ऑनलाइन उपस्थिति मजबूत करने में मदद करते हैं।",
    };
  }
  if (service.slug === "risk-governance-compliance") {
    return {
      ...service,
      title: "जोखिम गवर्नेंस, DPDP एवं अनुपालन",
      shortDescription:
        "भारत DPDP एक्ट 2023, SOC-2, ISO 27001 और एंटरप्राइज डेटा गोपनीयता अनुपालन ढांचा।",
      description:
        "हम एंटरप्राइज अनुपालन ढांचा, DPDP एक्ट 2023 तत्परता, SOC-2 अनुपालन, डेटा गोपनीयता नियंत्रण और साइबर सुरक्षा जोखिम प्रबंधन लागू करते हैं।",
    };
  }
  if (service.slug === "audit-improvement") {
    return {
      ...service,
      title: "सिस्टम ऑडिट एवं परफॉरमेंस ट्यूनिंग",
      shortDescription:
        "कोड ऑडिट, कोर वेब विटल्स अनुकूलन, इंफ्रास्ट्रक्चर दक्षता समीक्षा और FinOps लागत में कटौती।",
      description:
        "हम सूक्ष्म प्रणाली दक्षता समीक्षा, कोड ऑडिट, प्रदर्शन ट्यूनिंग, कोर वेब विटल्स सुधार और क्लाउड लागत अपव्यय में कटौती करते हैं।",
    };
  }
  if (service.slug === "training-staff-augmentation") {
    return {
      ...service,
      title: "स्टाफ ऑग्मेंटेशन एवं समर्पित इंजीनियरिंग टीम",
      shortDescription:
        "ऑन-डिमांड सीनियर फुल-स्टैक इंजीनियर्स, समर्पित डेवलपमेंट स्क्वॉड और एंटरप्राइज ट्रेनिंग।",
      description:
        "हम जांचे-परखे ऑन-डिमांड वरिष्ठ तकनीकी विशेषज्ञ, फुल-स्टैक इंजीनियरिंग स्क्वॉड और अनुकूलित एंटरप्राइज तकनीकी प्रशिक्षण कार्यक्रम प्रदान करते हैं।",
    };
  }
  return {
    ...service,
    title: "एआई एवं ऑटोमेशन समाधान",
    shortDescription:
      "कस्टम जनरेटिव एआई एजेंट्स, प्रेडिक्टिव एमएल मॉडल्स और बुद्धिमान वर्कफ़्लो ऑटोमेशन।",
    description:
      "हम बुद्धिमान एआई वर्कफ़्लो, कस्टम प्रेडिक्टिव मॉडल, स्वचालित डेटा पाइपलाइन और जनरेटिव एआई एजेंटों को एंटरप्राइज प्लेटफॉर्म में एकीकृत करते हैं।",
  };
});

export const hiCaseStudies: CaseStudy[] = enCaseStudies.map((cs) => {
  if (cs.slug === "enterprise-cloud-transformation") {
    return {
      ...cs,
      title: "एंटरप्राइज क्लाउड माइग्रेशन एवं आर्किटेक्चर मॉडर्नाइजेशन",
      client: "गोपनीय ग्लोबल फिनटेक एवं लॉजिस्टिक्स एंटरप्राइज",
      clientIndustry: "वित्तीय प्रौद्योगिकी एवं लॉजिस्टिक्स",
      serviceCategory: "आईटी रणनीति एवं कंसल्टिंग",
      summary:
        "ऑन-प्रीमिस मोनोलिथिक आर्किटेक्चर से उच्च-उपलब्धता क्लाउड-नेटिव माइक्रोसर्विसेज इंफ्रास्ट्रक्चर में परिवर्तन।",
      challenge:
        "पीक बिजनेस ऑवर्स के दौरान बार-बार सिस्टम टाइमआउट और अनियंत्रित ऑन-प्रीमिस रखरखाव लागत।",
      objective:
        "शून्य डेटा हानि के साथ एक लचीला बहु-क्लाउड आर्किटेक्चर तैयार करना और स्वचालित FinOps गवर्नेंस स्थापित करना।",
      approach:
        "4-सप्ताह का आर्किटेक्चरल ऑडिट, AWS पर कुबेरनेट्स टारगेट स्टेट और जीरो-डाउनटाइम डेटाबेस माइग्रेशन।",
      solution:
        "ऑटोमेटेड CI/CD पाइपलाइनों, कंटेनराइज्ड ऑर्केस्ट्रेशन और मल्टी-रीजन डिजास्टर रिकवरी के साथ माइक्रोसर्विसेज लागू किए गए।",
      results: [
        { metric: "99.99%", label: "सिस्टम अपटाइम SLA", description: "महत्वपूर्ण लेनदेन एंडपॉइंट्स पर निरंतर उच्च उपलब्धता।" },
        { metric: "45%", label: "क्लाउड लागत अनुकूलन", description: "स्वचालित ऑटो-स्केलिंग द्वारा मासिक इंफ्रास्ट्रक्चर खर्च में कमी।" },
        { metric: "3.2x", label: "परिनियोजन गति", description: "स्वचालित CI/CD पाइपलाइनों के माध्यम से उत्पादन रिलीज़ में तेज़ी।" },
      ],
      testimonial: {
        quote: "अराव इनोवेशन ने शून्य डाउनटाइम के साथ हमारे कोर आर्किटेक्चर का आधुनिकीकरण किया। उनकी वरिष्ठ टीम ने समय से पहले डिलीवरी की।",
        author: "कार्यकारी उपाध्यक्ष",
        designation: "मुख्य प्रौद्योगिकी अधिकारी",
        company: "ग्लोबल लॉजिस्टिक्स एवं फिनटेक डिवीजन",
      },
    };
  }
  return cs;
});

export const hiBlogPosts: BlogPost[] = enBlogPosts.map((post) => {
  if (post.slug === "dpdp-act-readiness-guide-enterprises") {
    return {
      ...post,
      title: "भारत के डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम 2023 का अनुपालन: CTO गाइड",
      summary: "व्यक्तिगत डेटा टचपॉइंट्स की पहचान करने, सहमति वर्कफ़्लो स्थापित करने और विनियामक दंडों से बचने के लिए व्यावहारिक इंजीनियरिंग कदम।",
      category: "जोखिम एवं गवर्नेंस",
      readTime: "7 मिनट पठन",
      dateFormatted: "अगस्त 2026",
      keyTakeaways: [
        "DPDP सत्यापन योग्य सहमति तंत्र अनिवार्य करता है जिसे आसानी से वापस लिया जा सकता है।",
        "डेटा उल्लंघन के लिए डेटा फिडुशियरीज को ₹250 करोड़ तक के वैधानिक दंड का सामना करना पड़ सकता है।",
        "लेगेसी डेटाबेस और लॉगिंग पाइपलाइनों से बिना एन्क्रिप्टेड PII डेटा को हटाना अनिवार्य है।",
      ],
    };
  }
  return post;
});

// ============================================================================
// ARABIC DATA OVERLAYS
// ============================================================================

export const arServices: Service[] = enServices.map((service) => {
  if (service.slug === "it-strategy-consulting") {
    return {
      ...service,
      title: "استراتيجية تكنولوجيا المعلومات والاستشارات المؤسسية",
      shortDescription:
        "تحديث البنية التحتية السحابية، وصياغة خارطة طريق التقنية، وتحسين معمارية السحابة المتعددة.",
      description:
        "نساعد المؤسسات الرائدة على تحديث البنية التحتية القديمة، وصياغة خارطة طريق تكنولوجية متعددة السنوات، وتحسين البنية السحابية عبر AWS و Azure و GCP.",
    };
  }
  if (service.slug === "web-app-development") {
    return {
      ...service,
      title: "هندسة تطبيقات الويب والموبايل",
      shortDescription:
        "منصات مؤسسية فائقة الأداء مبنية على Next.js و React والخدمات السحابية المصغرة.",
      description:
        "نبني بوابات ويب فائقة السرعة، ومنصات SaaS معقدة، وخدمات مصغرة سحابية، وتطبيقات موبايل باستخدام أحدث معمارية Next.js و React.",
    };
  }
  if (service.slug === "digital-marketing") {
    return {
      ...service,
      title: "التسويق الرقمي ونمو محركات البحث (SEO)",
      shortDescription:
        "توليد الطلب للمؤسسات (B2B Demand Gen)، وحملات LinkedIn و Google فائقة الاستهداف.",
      description:
        "نساعد الشركات على تعزيز تواجدها الرقمي من خلال استراتيجيات توليد الطلب B2B، وحملات الإعلانات عالية الاستهداف، ونمذجة قمع التحويل.",
    };
  }
  if (service.slug === "risk-governance-compliance") {
    return {
      ...service,
      title: "حوكمة المخاطر والامتثال لحماية البيانات",
      shortDescription:
        "أطر الامتثال لمعايير SOC-2 و ISO 27001 وحماية البيانات الشخصية.",
      description:
        "ننُفذ أطر الامتثال المؤسسي، وضوابط خفض المخاطر السيبرانية، وجاهزية معايير SOC-2 وحماية بيانات المستخدمين.",
    };
  }
  if (service.slug === "audit-improvement") {
    return {
      ...service,
      title: "تدقيق الأنظمة وتحسين الأداء",
      shortDescription:
        "تدقيق البرمجيات، تحسين مؤشرات Core Web Vitals، وخفض تكاليف السحابة.",
      description:
        "نقوم بمراجعات دقيقة لكفاءة الأنظمة، وتدقيق الكود المصدري، وتسريع الأداء، وتخفيض الهدر في الميزانيات السحابية.",
    };
  }
  if (service.slug === "training-staff-augmentation") {
    return {
      ...service,
      title: "تعزيز الفرق الفنية والكوادر المتخصصة",
      shortDescription:
        "فرق هندسية مخصصة حسب الطلب، ومطورون محترفون، وتدريب مؤسسي.",
      description:
        "نوفر كوادر تقنية متقدمة عند الطلب، وفرق عمل متكاملة لتطوير البرمجيات، وبرامج تدريبية متخصصة للمؤسسات.",
    };
  }
  return {
    ...service,
    title: "حلول الذكاء الاصطناعي والأتمتة",
    shortDescription:
      "وكلاء الذكاء الاصطناعي التوليدي، ونماذج التنبؤ، وأتمتة مسارات العمل.",
    description:
      "دمج الذكاء الاصطناعي الذكي، ونماذج التنبؤ، وأتمتة مسارات البيانات في منصات المؤسسات.",
  };
});

export const arCaseStudies: CaseStudy[] = enCaseStudies.map((cs) => {
  if (cs.slug === "enterprise-cloud-transformation") {
    return {
      ...cs,
      title: "تحديث البنية التحتية والتحول السحابي للمؤسسات",
      client: "عميل عالمي في قطاع التكنولوجيا المالية والخدمات اللوجستية",
      clientIndustry: "التكنولوجيا المالية والخدمات اللوجستية",
      serviceCategory: "استراتيجية تكنولوجيا المعلومات",
      summary:
        "التحول من البنية القديمة إلى بنية سحابية مرنة عالية التوفر قائمة على الخدمات المصغرة.",
      challenge:
        "توقفات متكررة للنظام خلال ساعات الذروة وتكاليف صيانة تصاعدية بدون خطة سحابية واضحة.",
      objective:
        "تصميم بنية سحابية متعددة مع التوفر العالي وتطبيق أتمتة حوكمة التكاليف.",
      results: [
        { metric: "99.99%", label: "اتفاقية مستوى الخدمة SLA", description: "توفر استثنائي ومستمر عبر النقاط الرئيسية للنظام." },
        { metric: "45%", label: "تحسين تكاليف السحابة", description: "تقليل الإنفاق الشهري بفضل الأتمتة والتوسع الذكي." },
        { metric: "3.2x", label: "سرعة النشر والتحديث", description: "تسريع إصدارات الإنتاج عبر خطوط النشر الآلية." },
      ],
      testimonial: {
        quote: "قامت آراف إينوفيشينز بتحديث بنيتنا التحتية بدون أي توقف للنظام. سلم الفريق المشترك المشروع قبل الموعد المحدد.",
        author: "نائب الرئيس التنفيذي",
        designation: "المدير التنفيذي للتكنولوجيا",
        company: "قطاع اللوجستيات والتكنولوجيا المالية",
      },
    };
  }
  return cs;
});

export const arBlogPosts: BlogPost[] = enBlogPosts.map((post) => {
  if (post.slug === "dpdp-act-readiness-guide-enterprises") {
    return {
      ...post,
      title: "دليل الامتثال لقوانين حماية البيانات الشخصية: قائمة التحقيق للمدراء التنفيذيين",
      summary: "خطوات هندسية عملية لتحديد نقاط تشفير البيانات الشخصية وآليات الموافقة وتجنب الغرامات التنظيمية.",
      category: "الحوكمة والمخاطر",
      readTime: "7 دقائق قراءة",
      dateFormatted: "أغسطس 2026",
      keyTakeaways: [
        "تتطلب تشريعات حماية البيانات التشفير الكامل وآليات الموافقة القابلة للإلغاء بسهولة.",
        "تواجه الجهات غير الممتثلة عقوبات وتنظيمية مشددة في حال تسريب البيانات.",
      ],
    };
  }
  return post;
});

// ============================================================================
// LOCALE GETTERS LAYER
// ============================================================================

export function getLocalizedServices(locale: string): Service[] {
  if (locale === "hi") return hiServices;
  if (locale === "ar") return arServices;
  return enServices;
}

export function getLocalizedCaseStudies(locale: string): CaseStudy[] {
  if (locale === "hi") return hiCaseStudies;
  if (locale === "ar") return arCaseStudies;
  return enCaseStudies;
}

export function getLocalizedBlogPosts(locale: string): BlogPost[] {
  if (locale === "hi") return hiBlogPosts;
  if (locale === "ar") return arBlogPosts;
  return enBlogPosts;
}

export function getLocalizedProducts(locale: string): Product[] {
  return enProducts;
}

export function getLocalizedTestimonials(locale: string): Testimonial[] {
  if (locale === "hi") {
    return enTestimonials.map((t, idx) => {
      if (idx === 0) {
        return {
          ...t,
          quote: "अराव इनोवेशन ने हमारे कोर SaaS प्लेटफॉर्म का आधुनिकीकरण किया और लेटेंसी में 65% की कमी की। उनकी इंजीनियरिंग टीम अत्यधिक सटीक काम करती है।",
          service: "वेब एवं ऐप इंजीनियरिंग",
        };
      }
      if (idx === 1) {
        return {
          ...t,
          quote: "उनकी B2B मांग जनरेशन टीम ने हमारे अभियान में संरचित एट्रिब्यूशन लाया। 4 महीनों में हमारी पाइपलाइन 3.2x बढ़ी।",
          service: "डिजिटल मार्केटिंग",
        };
      }
      return {
        ...t,
        quote: "अराव की अनुपालन टीम के साथ अनुपालन प्रक्रिया आसान रही। उन्होंने हमारे डेटा पाइपलाइनों का ऑडिट किया और पूर्ण तत्परता सुनिश्चित की।",
        service: "जोखिम एवं अनुपालन",
      };
    });
  }
  if (locale === "ar") {
    return enTestimonials.map((t, idx) => {
      if (idx === 0) {
        return {
          ...t,
          quote: "قامت آراف إينوفيشينز بتحديث منصتنا السحابية وتقليل زمن الاستجابة بنسبة 65%. تعمل فرقتها الهندسية بدقة متناهية.",
          service: "هندسة تطبيقات الويب",
        };
      }
      if (idx === 1) {
        return {
          ...t,
          quote: "قدم فريق التسويق الرقمي لديهم تحليلات دقيقة لحملاتنا. نمت خطة المبيعات لدينا 3.2 ضعف خلال 4 أشهر.",
          service: "التسويق الرقمي",
        };
      }
      return {
        ...t,
        quote: "كان التعامل مع فريق حوكمة البيانات في آراف متميزاً وسلساً. قاموا بتدقيق أنظمتنا وضمان الامتثال التام.",
        service: "الحوكمة والامتثال",
      };
    });
  }
  return enTestimonials;
}

export function getLocalizedIndustries(locale: string): IndustrySolution[] {
  return enIndustries;
}
