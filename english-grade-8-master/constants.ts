import { TabId, TabConfig } from './types';

export const TABS: TabConfig[] = [
  { 
    id: TabId.UNIT1_USED_TO, 
    label: 'Used To Structure', 
    unit: 'Unit 1', 
    promptTopic: 'Structure "Used to" (affirmative, negative, question forms) and its usage for past habits.', 
    color: 'bg-blue-500' 
  },
  { 
    id: TabId.UNIT1_PAST_CONT, 
    label: 'Past Continuous', 
    unit: 'Unit 1', 
    promptTopic: 'Past Continuous tense usage, structure, and distinction/combination with Past Simple (when/while).', 
    color: 'bg-indigo-500' 
  },
  { 
    id: TabId.UNIT1_VOCAB, 
    label: 'Fads & Fashions Vocab', 
    unit: 'Unit 1', 
    promptTopic: 'Vocabulary related to Fads and Fashions (e.g., accessories, attire, bespoke, etc.).', 
    color: 'bg-purple-500' 
  },
  { 
    id: TabId.UNIT2_PRES_PERF, 
    label: 'Present Perfect', 
    unit: 'Unit 2', 
    promptTopic: 'Present Perfect tense structure, usage, signal words (just, already, yet, ever), and For vs Since.', 
    color: 'bg-emerald-500' 
  },
  { 
    id: TabId.UNIT2_VOCAB, 
    label: 'Sensations Vocab', 
    unit: 'Unit 2', 
    promptTopic: 'Vocabulary related to Sensations and Emotions (e.g., anxious, confused, terrible, wonderful).', 
    color: 'bg-teal-500' 
  },
];

export const CURRICULUM_CONTEXT = `
Ngữ pháp Tiếng Anh 8 Unit 1 (Friends Plus): Fads and Fashions
I. Cấu trúc với Used to
Cấu trúc used to được dùng để nói về việc 1 thói quen, trạng thái, sự kiện đã từng xảy ra trong quá khứ nhưng đã chấm dứt và không còn đúng ở hiện tại nữa.
Cấu trúc used to:
(+) S + used to + V(inf - nguyên thể)
(-) S + didn’t use to + V(inf - nguyên thể)
(?) Did + S + use to + V(inf - nguyên thể)
Yes, S + did. Or: No, S + didn’t.
Ex: I used to go to school by bike. She didn’t use to have short hair.

II. Thì Quá khứ tiếp diễn – The past continuous
Thì quá khứ tiếp diễn (past continuous) dùng để diễn tả hành động diễn ra hoặc kéo dài vào một thời điểm trong quá khứ.
Cấu trúc:
· Câu khẳng định: S + was/were + Ving…
· Câu phủ định: S + was not/were not + Ving…
· Câu nghi vấn: Was/Were + S + Ving…?;
Dấu hiệu nhận biết: At + giờ + mốc thời gian trong quá khứ; At this time + thời gian trong quá khứ; In + năm; when, before, after, whenever, until.

III. Thì Quá khứ tiếp diễn & Thì quá khứ đơn
When + thì quá khứ đơn, thì quá khứ tiếp diễn
While + thì quá khứ tiếp diễn, thì quá khứ đơn

Từ vựng Unit 1: Accent, Accessories, Acid wash, Achromatic colours, Art deco, Art Nouveau, Academic costume, Accent shades, Accessorizing, Active sportswear, Adaptation, Advanced colours, a la mode, Accouterments, Apparel, Apparel manufacturing, Asymmetrical, Atelier, Attire, Athletic clothing, Au naturel, Avant-Garde, Body clothes, Balance / symmetry, Bespoke, Barfly apparel, Beaumonde, Black tie event, Bling, Body-con clothing, Boutique, Boyfriend style, Bib and tucker, Border print, Bohemian style (Boho), Business Formal, Business Casual, Bulky clothing, Capsule wardrobe, Cut of a garment, Camouflage clothing, Care label, Casual wear, Catwalk, Channel suit, Chic, Chinois, Cine mode, Cocktail dress code, Collection, Colour coordination, Classic, Clique, Colour blocking, Colorway, Cosplay, Country look, Cool colours, Contrast, Conservative styles.

Ngữ pháp Tiếng Anh 9 Unit 2 (Friends plus): Sensations
I. Thì Hiện tại hoàn thành – The present perfect
Cấu trúc: S + have/has + V3/Ved.
Cách dùng: Hành động xảy ra trong quá khứ kéo dài đến hiện tại; Hành động lặp lại; Kinh nghiệm; Hành động vừa mới xảy ra; Hành động trong quá khứ để lại hậu quả hiện tại.
Dấu hiệu: Just, Already, Recently, Lately, Since, For, Ever, Never, So far, Until now, Up to now.

II. Phân biệt For và Since
- For + khoảng thời gian (Ex: for 2 days).
- Since + mốc thời gian (Ex: since 1990, since I was born).

III. Phân biệt Thì hiện tại hoàn thành & Thì quá khứ đơn
- HTHT: Hành động còn liên quan hiện tại.
- QKĐ: Hành động đã chấm dứt hoàn toàn trong quá khứ.

Từ vựng Unit 2: brave, easy, difficult, angry, happy, sad, silly, funny, safe, hungry, strong, surprised, terrible, thirsty, tired, hurt, warm, full, Good, Bad, annoyed, positive, negative, confused, Depressed, Hurt, anxious, stressed, wonderful, Worried.
`;
