const { generateGeminiResponse } = require("../services/ai.Service");

// 🟩 Summary: bullet points
module.exports.askForSummary = async (text) => {
    if (!text) return { error: "Text is required for summarization" };

    const prompt = `Summarize the following content in 5-7 bullet points:\n\n${text}`;
    const output = await generateGeminiResponse(prompt);
    if (output.error) return { error: output.error };

    const points = output
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('*'))
        .map(line => line.replace(/^\*\s*/, ''));

    return { summary: points };
};

// 🟩 QnA: Array of { question, answer }
module.exports.askAiForQnA = async (text) => {
    if (!text) return { error: "Text is required for QnA generation" };

    const prompt = `Generate 5 question-answer pairs from the following content. Format:\nQ: question text\nA: answer text\n\n${text}`;
    const output = await generateGeminiResponse(prompt);
    if (output.error) return { error: output.error };

    const qna = [];
    const lines = output.split('\n').map(line => line.trim());
    let currentQ = '', currentA = '';

    lines.forEach(line => {
        if (line.startsWith('Q:')) {
            if (currentQ && currentA) qna.push({ question: currentQ, answer: currentA });
            currentQ = line.replace(/^Q:\s*/, '');
            currentA = '';
        } else if (line.startsWith('A:')) {
            currentA = line.replace(/^A:\s*/, '');
        }
    });

    if (currentQ && currentA) qna.push({ question: currentQ, answer: currentA });

    return { qna };
};

// 🟩 Quiz: MCQ with options and correct answer
module.exports.askAIforQuiz = async (text) => {
    if (!text) return { error: "Text is required for quiz generation" };

    const prompt = `Create 5 multiple-choice questions based on the content below. Format each question like:\n\nQ: Question text\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4\nCorrect Answer: B\n\n${text}`;
    const output = await generateGeminiResponse(prompt);
    if (output.error) return { error: output.error };

    const quiz = [];
    const blocks = output.split(/\n\s*\n/);

    blocks.forEach(block => {
        const lines = block.trim().split('\n').map(l => l.trim());
        if (lines.length >= 6) {
            const question = lines[0].replace(/^Q:\s*/, '');
            const options = lines.slice(1, 5).map(opt => opt.replace(/^[A-D]\)\s*/, ''));
            const correctLine = lines.find(line => /^Correct Answer:/i.test(line));
            const correctOption = correctLine ? correctLine.split(':')[1].trim() : null;

            quiz.push({ question, options, correctAnswer: correctOption });
        }
    });

    return { quiz };
};

// 🟩 True/False: [{ question, answer }]
module.exports.askAIforTrueFalse = async (text) => {
    if (!text) return { error: "Text is required for true/false generation" };

    const prompt = `Generate 5 True/False questions from the content below. Format each line as:\nQ: Question text\nAnswer: True/False\n\n${text}`;
    const output = await generateGeminiResponse(prompt);
    if (output.error) return { error: output.error };

    const tf = [];
    const blocks = output.split(/\n\s*\n/);

    blocks.forEach(block => {
        const lines = block.trim().split('\n').map(l => l.trim());
        const questionLine = lines.find(line => line.startsWith('Q:'));
        const answerLine = lines.find(line => line.startsWith('Answer:'));

        if (questionLine && answerLine) {
            tf.push({
                question: questionLine.replace(/^Q:\s*/, ''),
                answer: answerLine.replace(/^Answer:\s*/, '')
            });
        }
    });

    return { trueFalse: tf };
};
