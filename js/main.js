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
        });
    });

    // 梦境解读功能
    interpretBtn.addEventListener('click', async () => {
        const dreamText = dreamInput.value.trim();
        if (!dreamText) {
            showError(interpretationResult, '请输入你的梦境描述');
            return;
        }

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

            // 解析结果并更新可视化
            updateVisualizationWithResult(interpretation);
        } catch (error) {
            interpretationResult.classList.remove('analyzing');
            showError(interpretationResult, error.message);
        }
    });

    // 梦境续写功能
    continueBtn.addEventListener('click', async () => {
        const fragmentText = dreamFragment.value.trim();
        if (!fragmentText) {
            showError(continuationResult, '请输入梦境片段');
            return;
        }

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
        } catch (error) {
            continuationResult.classList.remove('analyzing');
            showError(continuationResult, error.message);
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
}); 