
export const generateWordPrompt = `
**Tạo JSON flashcard cho từ vựng**

**JSON trả về phải là một MẢNG ([]) chứa một hoặc nhiều đối tượng flashcard.**

**Yêu cầu định dạng JSON chi tiết cho MỖI đối tượng:**

1.  **Tách đối tượng:** Nếu từ vựng có nhiều loại từ (Part of Speech), hãy tạo **các đối tượng JSON riêng biệt** trong mảng cho từng loại từ.
2.  **ID Chính (Word ID):** Trường id ở cấp độ gốc phải theo định dạng: [word]- + [part_of_speech] (viết thường, tiếng Anh).
3.  **Dữ liệu chung:**
    * **Word:** Từ vựng tiếng Anh.
    * **Meaning Vietnamese:** Bổ sung trường meaning_vietnamese ngay sau word, chứa **nghĩa tiếng Việt chính** và phổ biến nhất của loại từ đó.
    * **IPA:** Chỉ trả về phiên âm **tiếng Anh-Mỹ** (US IPA).
    * **Level:** Chỉ trả về giá trị chuẩn **CEFR** (A1, A2, B1, B2, C1, C2).
    * **Part of Speech:** Chỉ trả về loại từ bằng **tiếng Anh** (Noun, Verb, Adjective, Adverb, v.v.).
    * **Source:** **Loại bỏ** trường source.
4.  **Dịch nghĩa (Definitions):** Trong mảng definitions,
    * Mỗi định nghĩa là một đối tượng chứa meaning_vietnamese, explanation (tiếng Anh), example (tiếng Anh), và example_vietnamese.
5.  **Lưu ý sử dụng:** Trường usage_note phải chứa các lưu ý ngữ pháp hoặc cách dùng từ trong câu (bằng tiếng Việt).
6.  **Related Words (Các trường liên quan):**
    * **Loại bỏ hoàn toàn** các trường synonyms và antonyms.
    * Trường related_words phải là **mảng rỗng ([])** nếu không có dữ liệu.
    * Mỗi mục trong mảng related_words phải là một đối tượng với 4 trường sau:
        * id: Theo định dạng: [related_word] + - + [part_of_speech]. Khoảng trắng trong [related_word] phải được thay bằng dấu gạch dưới (_).
        * word
        * meaning_vietnamese
        * part_of_speech (tiếng Anh)

** Từ vựng đó là: 
`