-- Hindi translations for category_descriptions table
-- Run this after migrate-i18n.sql

UPDATE category_descriptions SET description_hi = 'ऑटोमोटिव और औद्योगिक अनुप्रयोगों के लिए विशेष उपकरण' WHERE category = 'Centre of Excellence';
UPDATE category_descriptions SET description_hi = 'त्वरित और नियंत्रित संश्लेषण के लिए उपकरण' WHERE category = 'Chemical Synthesis';
UPDATE category_descriptions SET description_hi = 'जटिल मिश्रणों के लिए पृथक्करण और विश्लेषण तकनीकें' WHERE category = 'Chromatography';
UPDATE category_descriptions SET description_hi = 'तत्व संयोजन का मात्रात्मक निर्धारण' WHERE category = 'Elemental Analysis';
UPDATE category_descriptions SET description_hi = 'मुख्य सुविधा बुनियादी ढांचा और उपयोगिताएँ' WHERE category = 'Facility';
UPDATE category_descriptions SET description_hi = 'नमूना संरक्षण के लिए फ्रीज़ ड्राइंग (लायोफिलाइज़ेशन) प्रणालियाँ' WHERE category = 'Freeze Drying';
UPDATE category_descriptions SET description_hi = 'रियोलॉजिकल और यांत्रिक गुण विश्लेषण' WHERE category = 'Material Testing';
UPDATE category_descriptions SET description_hi = 'नैनो से माइक्रो स्केल तक उन्नत इमेजिंग तकनीकें' WHERE category = 'Microscopy';
UPDATE category_descriptions SET description_hi = 'प्रकाशिक गुण माप उपकरण' WHERE category = 'Optical Analysis';
UPDATE category_descriptions SET description_hi = 'आणविक और परमाणु विशेषता के लिए स्पेक्ट्रोस्कोपिक विधियाँ' WHERE category = 'Spectroscopy';
UPDATE category_descriptions SET description_hi = 'सतह क्षेत्रफल, छेदरन्ध्र और अशोषण विशेषता' WHERE category = 'Surface Analysis';
UPDATE category_descriptions SET description_hi = 'सामग्री का तापमान-निर्भर गुण विश्लेषण' WHERE category = 'Thermal Analysis';
UPDATE category_descriptions SET description_hi = 'उच्च-शुद्धता जल उत्पादन प्रणालियाँ' WHERE category = 'Water Purification';
