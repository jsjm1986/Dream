document.addEventListener('DOMContentLoaded', () => {
    // 欢迎弹窗控制
    const welcomeModal = document.querySelector('.welcome-modal');
    const startBtn = document.querySelector('.start-btn');
    const closeBtn = document.querySelector('.welcome-close');

    // 显示欢迎弹窗
    function showWelcomeModal() {
        welcomeModal.style.display = 'flex';
        setTimeout(() => {
            welcomeModal.classList.add('active');
        }, 10);
    }

    // 隐藏欢迎弹窗
    function hideWelcomeModal() {
        welcomeModal.classList.remove('active');
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 300);
    }

    // 每次打开页面都显示弹窗
    showWelcomeModal();

    // 绑定关闭事件
    startBtn.addEventListener('click', hideWelcomeModal);
    closeBtn.addEventListener('click', hideWelcomeModal);
    welcomeModal.addEventListener('click', (e) => {
        if (e.target === welcomeModal) {
            hideWelcomeModal();
        }
    });

    // 获取DOM元素
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const interpretBtn = document.getElementById('interpret-btn');
    const continueBtn = document.getElementById('continue-btn');
    const dreamInput = document.getElementById('dream-input');
    const dreamFragment = document.getElementById('dream-fragment');
    const interpretationResult = document.getElementById('interpretation-result');
    const continuationResult = document.getElementById('continuation-result');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // API密钥设置
    const API_KEY = 'sk-2b089eb243dc469aa20ed9c340a0af4c';
    window.dreamAPI.setApiKey(API_KEY);

    // 标签切换功能
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新内容区域
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-section`) {
                    content.classList.add('active');
                }
            });

            // 重置可视化区域
            document.querySelector('.analysis-process').style.display = 'none';
            document.querySelector('.writing-process').style.display = 'none';

            // 如果切换到对话标签，更新UI状态
            if (tabId === 'chat') {
                updateChatUIState();
            }
        });
    });

    // 梦境解读功能
    interpretBtn.addEventListener('click', async () => {
        const dreamText = dreamInput.value.trim();
        if (!dreamText) {
            showError(interpretationResult, '请输入你的梦境描述');
            return;
        }

        // 显示解析过程
        const analysisProcess = document.querySelector('.analysis-process');
        analysisProcess.style.display = 'block';

        // 开始可视化过程
        await window.dreamVisualization.visualizeInterpretation(dreamText);

        // 显示加载动画
        interpretationResult.innerHTML = '';
        interpretationResult.appendChild(createLoader());
        interpretationResult.classList.add('analyzing');

        try {
            const interpretation = await window.dreamAPI.interpretDream(dreamText);
            interpretationResult.classList.remove('analyzing');
            interpretationResult.innerHTML = interpretation.replace(/\n/g, '<br>');

            // 更新对话上下文
            updateChatContext(dreamText, interpretation);

            // 解析结果并更新可视化
            updateVisualizationWithResult(interpretation);

            // 在结果显示后隐藏解析过程
            setTimeout(() => {
                analysisProcess.style.display = 'none';
            }, 2000); // 延迟2秒后隐藏，让用户能看到完整的解析过程

        } catch (error) {
            interpretationResult.classList.remove('analyzing');
            showError(interpretationResult, error.message);
            // 出错时也隐藏解析过程
            analysisProcess.style.display = 'none';
        }
    });

    // 梦境续写功能
    continueBtn.addEventListener('click', async () => {
        const fragmentText = dreamFragment.value.trim();
        if (!fragmentText) {
            showError(continuationResult, '请输入梦境片段');
            return;
        }

        // 显示续写过程
        const writingProcess = document.querySelector('.writing-process');
        writingProcess.style.display = 'block';

        // 开始可视化过程
        await window.dreamVisualization.visualizeWriting(fragmentText);

        // 显示加载动画
        continuationResult.innerHTML = '';
        continuationResult.appendChild(createLoader());
        continuationResult.classList.add('analyzing');

        try {
            const continuation = await window.dreamAPI.continueDream(fragmentText);
            continuationResult.classList.remove('analyzing');
            continuationResult.innerHTML = continuation.replace(/\n/g, '<br>');

            // 解析结果并更新可视化
            updateVisualizationWithContinuation(continuation);

            // 在结果显示后隐藏续写过程
            setTimeout(() => {
                writingProcess.style.display = 'none';
            }, 2000); // 延迟2秒后隐藏，让用户能看到完整的续写过程

        } catch (error) {
            continuationResult.classList.remove('analyzing');
            showError(continuationResult, error.message);
            // 出错时也隐藏续写过程
            writingProcess.style.display = 'none';
        }
    });

    // 创建加载动画
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loading';
        return loader;
    }

    // 显示错误信息
    function showError(element, message) {
        element.innerHTML = `<div class="error">${message}</div>`;
    }

    // 解析结果并更新可视化
    function updateVisualizationWithResult(interpretation) {
        // 这里可以添加解析逻辑，从解读结果中提取关键信息
        // 然后更新相应的可视化图表
        // 例如：提取情感词，更新情感波动图
        // 提取意象关键词，更新意象关系图
        // 提取主题词，更新主题元素
    }

    // 解析续写结果并更新可视化
    function updateVisualizationWithContinuation(continuation) {
        // 这里可以添加解析逻辑，从续写结果中提取关键信息
        // 然后更新相应的可视化图表
        // 例如：分析情节发展，更新故事流
        // 分析情感变化，更新情感轨迹
        // 提取符号词，更新符号云
    }

    // 文本框自动调整高度
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    [dreamInput, dreamFragment].forEach(textarea => {
        textarea.addEventListener('input', () => autoResizeTextarea(textarea));
    });

    // 添加输入提示
    dreamInput.placeholder = `请描述你的梦境...
例如：
"昨晚我梦见自己在一片广阔的花田里奔跑，
天空中飘着七彩的云朵，远处有座水晶城堡..."`;

    dreamFragment.placeholder = `请输入梦境片段...
例如：
"我站在悬崖边上，脚下是翻滚的云海，
一只金色的凤凰从远处飞来..."`;

    // 对话功能
    // 添加对话上下文管理
    const chatContext = {
        currentDream: '',
        interpretation: '',
        messages: [],
        isEnabled: false  // 添加状态控制
    };

    // 更新对话上下文
    function updateChatContext(dream, interpretation) {
        chatContext.currentDream = dream;
        chatContext.interpretation = interpretation;
        chatContext.messages = [{
            role: 'system',
            content: `当前解读的梦境：${dream}\n\n初始解读：${interpretation}`
        }];
        chatContext.isEnabled = true;  // 完成解读后启用对话功能
        
        // 更新UI状态
        updateChatUIState();
    }

    // 更新聊天界面状态
    function updateChatUIState() {
        const chatSection = document.getElementById('chat-section');
        const chatInputArea = chatSection.querySelector('.chat-input-area');
        const disabledOverlay = chatSection.querySelector('.disabled-overlay') || createDisabledOverlay();

        if (!chatContext.isEnabled) {
            // 禁用输入区域
            chatInputArea.style.opacity = '0.5';
            chatInputArea.style.pointerEvents = 'none';
            // 显示遮罩层
            disabledOverlay.style.display = 'flex';
        } else {
            // 启用输入区域
            chatInputArea.style.opacity = '1';
            chatInputArea.style.pointerEvents = 'auto';
            // 隐藏遮罩层
            disabledOverlay.style.display = 'none';
        }
    }

    // 创建禁用状态的遮罩层
    function createDisabledOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'disabled-overlay';
        overlay.innerHTML = `
            <div class="disabled-message">
                <div class="message-icon">🔒</div>
                <h3>请先完成梦境解读</h3>
                <p>在"梦境解读"标签页描述并解读你的梦境后，即可开始深入对话。</p>
                <button class="switch-tab-btn" data-tab="interpret">前往解读梦境</button>
            </div>
        `;
        
        // 添加切换标签的事件监听
        overlay.querySelector('.switch-tab-btn').addEventListener('click', () => {
            // 触发标签切换
            document.querySelector('.tab-btn[data-tab="interpret"]').click();
        });

        // 将遮罩层添加到聊天区域
        document.getElementById('chat-section').appendChild(overlay);
        return overlay;
    }

    async function handleChat() {
        // 如果对话功能未启用，直接返回
        if (!chatContext.isEnabled) {
            return;
        }

        const message = chatInput.value.trim();
        if (!message) return;

        // 添加用户消息
        addMessage(message, true);
        chatInput.value = '';
        autoResizeTextarea(chatInput);

        // 添加加载动画
        const loadingMessage = addLoadingMessage();

        try {
            // 构建提示词，包含上下文信息
            const prompt = `作为一位专业的梦境解读师，你正在与用户就一个特定的梦境进行深入对话。请基于之前的解读和对话历史，继续探索梦境的深层含义。

${chatContext.messages.length > 0 ? `
背景信息：
当前讨论的梦境：${chatContext.currentDream}
初始解读：${chatContext.interpretation}

对话历史：
${chatContext.messages.slice(1).map(msg => `${msg.role === 'user' ? '用户' : 'AI'}：${msg.content}`).join('\n')}
` : '这是新的对话开始。'}

用户的新问题是：${message}

请从以下几个方面深入解答用户的问题：

1. 问题聚焦
- 准确理解用户的具体困惑和关注点
- 将问题与梦境的具体元素关联
- 识别问题背后可能隐含的心理需求

2. 深度解析
- 运用专业理论对相关梦境元素进行深入分析
- 探索问题涉及的潜意识内容
- 建立梦境象征与现实生活的联系
- 揭示可能的心理动力和冲突

3. 个性化指导
- 结合用户的具体情况提供建议
- 设计有针对性的自我探索练习
- 提供可行的行动建议
- 注意建议的实用性和可操作性

4. 互动引导
- 提出开放性问题，引导用户进一步思考
- 鼓励用户分享更多相关联想和感受
- 帮助用户建立自我觉察
- 适时提供支持和肯定

回应要点：
- 紧扣用户问题：确保回答直接针对用户的困惑
- 理论支撑：适当引用心理学理论，但避免过于专业的术语
- 联系上下文：将回答与之前的解读和对话自然衔接
- 循序渐进：根据用户的接受程度逐步深化解读
- 共情理解：以温和、支持的语气传达专业见解
- 启发思考：在给出答案的同时，引导用户进行自我探索
- 实用导向：确保建议具有实际的指导意义

注意事项：
1. 如果用户提出的问题涉及梦境中尚未提及的新元素，要主动询问相关细节
2. 如果用户的问题比较笼统，要通过追问帮助其明确具体的困惑点
3. 如果用户表现出强烈的情绪反应，要优先关注其情感需求
4. 如果涉及敏感或重要的心理议题，要谨慎给出建议，必要时建议寻求专业心理咨询

请提供专业、深入且富有洞察力的回应，帮助用户更好地理解自己的梦境和内心世界。`;

            // 调用API
            const response = await window.dreamAPI.interpretDream(prompt);

            // 更新对话历史
            chatContext.messages.push(
                { role: 'user', content: message },
                { role: 'assistant', content: response }
            );

            // 移除加载动画
            loadingMessage.remove();

            // 添加系统回复
            addMessage(response);
        } catch (error) {
            // 移除加载动画
            loadingMessage.remove();
            
            // 添加错误消息
            addMessage('抱歉，我现在无法回应，请稍后再试。');
        }
    }

    // 绑定发送按钮事件
    sendBtn.addEventListener('click', handleChat);

    // 绑定输入框回车事件
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });

    // 自动调整聊天输入框高度
    chatInput.addEventListener('input', () => autoResizeTextarea(chatInput));

    // 格式化AI响应
    function formatAIResponse(response) {
        // 将回复按段落分割
        const paragraphs = response.split('\n\n');
        let formattedHtml = '';

        paragraphs.forEach(paragraph => {
            // 检查是否是标题（数字开头的行）
            if (/^\d+\./.test(paragraph)) {
                formattedHtml += `<div class="response-section">
                    <h3 class="section-title">${paragraph}</h3>
                </div>`;
            }
            // 检查是否是子项（以 - 开头的行）
            else if (paragraph.includes('\n- ')) {
                const [title, ...items] = paragraph.split('\n');
                formattedHtml += `<div class="response-section">
                    ${title ? `<h4 class="subsection-title">${title}</h4>` : ''}
                    <ul class="response-list">
                        ${items.map(item => `<li>${item.replace('- ', '')}</li>`).join('')}
                    </ul>
                </div>`;
            }
            // 普通段落
            else if (paragraph.trim()) {
                formattedHtml += `<div class="response-paragraph">${paragraph}</div>`;
            }
        });

        return formattedHtml;
    }

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'system'}`;
        
        if (isUser) {
            messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        } else {
            messageDiv.innerHTML = `<div class="message-content formatted-response">${formatAIResponse(content)}</div>`;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addLoadingMessage() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message system loading';
        loadingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return loadingDiv;
    }
}); 