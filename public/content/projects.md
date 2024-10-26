## Fine-tuning of open-source LLM using QLoRA

#### [Github Code](https://github.com/iamarunbrahma/finetuned-qlora-falcon7b-medical) | [Technical Blog](https://medium.com/@iamarunbrahma/fine-tuning-of-falcon-7b-large-language-model-using-qlora-on-mental-health-dataset-aa290eb6ec85)

- Fine-tuned a Falcon-7B large language model on custom mental health conversational dataset using Low-Rank Adaptation of Quantized LLMs (QLoRA). 
- The dataset was curated from online healthcare blogs, FAQs etc and removed personally identifiable information (PII). 
- Achieved a ROUGE-1 score of 0.37 on the test dataset.

---

## Prompt Testing Framework for LLMs

#### [Github Code](https://github.com/iamarunbrahma/llm-prompt-testing) | [Demo](https://huggingface.co/spaces/heliosbrahma/llm-prompt-testing)

- Designed a prompt testing framework for LLMs to compare and test prompt quality for multiple system prompts based on the generated answers.
- Measured answer accuracy using multiple NLP metrics i.e. ROUGE, BLEU, and BERTScore and multiple Responsible AI metrics i.e. Faithfulness, Answer Relevancy Score, Harmfulness etc. 
- Achieved a 27% improvement in system prompt quality for different LLM applications.

---

## Youtube AI Assistant using Langchain

#### [Github Code](https://github.com/iamarunbrahma/youtube-ai-assistant) | [Demo](https://huggingface.co/spaces/heliosbrahma/ai-youtube-assistant)

- Designed an end-to-end Retrieval Augmented Generation pipeline to generate summarized text using GPT-3.5-Turbo LLM for YouTube video transcripts and built a conversational AI system to get instant answers for YouTube video transcripts. 
- Used Qdrant Vector DB to retrieve transcript chunk embeddings and GPT-3.5-Turbo LLM from Langchain to generate answers 
- Achieved a BLEU score of 0.75 on generated responses compared to ground truth answers.

---

## Product Description Generator

#### [Github Code](https://github.com/iamarunbrahma/product-description-generator) | [Demo](https://huggingface.co/spaces/heliosbrahma/product-description-generator)

- Generated SEO-compliant product description using product title and meta-keywords provided by the user. 
- Implemented custom LLMChain function from the Langchain and few-shot prompting technique to generate multi-paragraph rich text product description for each product name and its corresponding keywords. 
- Built a gradio app as a frontend demo to showcase the technique.