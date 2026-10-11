-- Hindi translations for events and outreach tables
-- Run this after migrate-i18n.sql

-- ============================================================
-- EVENTS (2 rows)
-- ============================================================

UPDATE events SET
  title_hi = 'FE-SEM और उन्नत सूक्ष्मदर्शी पर कार्यशाला और व्यावहारिक प्रशिक्षण कार्यक्रम',
  full_description_hi = 'यह दो-दिवसीय कार्यशाला प्रतिभागियों को FE-SEM सहित उन्नत सूक्ष्मदर्शी तकनीकों की व्यावहारिक जानकारी प्रदान करने हेतु डिज़ाइन की गई है। कार्यक्रम में सैद्धांतिक सत्रों के साथ-साथ उपकरणों पर व्यावहारिक प्रशिक्षण भी शामिल है। प्रतिभागियों को नमूना तैयारी, इमेजिंग और डेटा विश्लेषण का व्यावहारिक अनुभव प्राप्त होगा।',
  venue_hi = 'Sophisticated Instrumentation Centre (SIC), IIT Indore'
WHERE id = 1;

UPDATE events SET
  title_hi = 'उन्नत सूक्ष्मदर्शी पर कार्यशाला और व्यावहारिक प्रशिक्षण',
  full_description_hi = 'उन्नत सूक्ष्मदर्शी पर 3-दिवसीय व्यावहारिक कार्यशाला, जिसमें प्रतिभागियों को विभिन्न सूक्ष्मदर्शी तकनीकों के साथ काम करने का अनुभव प्रदान किया जाता है।',
  venue_hi = 'Sophisticated Instrumentation Centre, IIT Indore'
WHERE id = 2;

-- ============================================================
-- OUTREACH (6 rows)
-- ============================================================

UPDATE outreach SET
  title_hi = 'प्रोफेसर Irina A. Kurzina का SIC दौरा',
  description_hi = 'रूस के Tomsk State University की प्रोफेसर ने SIC का दौरा किया।'
WHERE id = 2;

UPDATE outreach SET
  title_hi = 'IPS Academy Indore के मास्टर्स छात्रों का SIC दौरा',
  description_hi = 'IPS Academy Indore के मास्टर्स छात्रों ने SIC का दौरा किया।'
WHERE id = 3;

UPDATE outreach SET
  title_hi = 'विदेशी सेना अधिकारियों का SIC दौरा',
  description_hi = 'MCTE MHOW के अंतर्गत विदेशी सेना अधिकारियों का SIC दौरा।'
WHERE id = 4;

UPDATE outreach SET
  title_hi = 'Ms. Saumya Gupta IAS का दौरा',
  description_hi = 'Ms. Saumya Gupta IAS, संयुक्त सचिव तकनीकी शिक्षा का SIC दौरा।'
WHERE id = 5;

UPDATE outreach SET
  title_hi = 'डॉ. K. Sivan का दौरा',
  description_hi = 'IIT Indore के BOG अध्यक्ष और ISRO के पूर्व अध्यक्ष का दौरा।'
WHERE id = 7;

UPDATE outreach SET
  title_hi = 'विदेशी सेना कर्मियों का SIC दौरा',
  description_hi = 'विभिन्न देशों के 47 सेना कर्मियों ने SIC का दौरा किया।'
WHERE id = 9;
