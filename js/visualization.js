class DreamVisualization {
    constructor() {
        this.emotionChart = null;
        this.symbolChart = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });
    }

    // 解读过程可视化
    async visualizeInterpretation(dreamText) {
        const analysisProcess = document.querySelector('.analysis-process');
        analysisProcess.style.display = 'block';
        
        // 重置进度
        this.updateProgress(0);
        
        // 清空之前的步骤
        const stepsContainer = document.querySelector('.process-steps');
        stepsContainer.innerHTML = '';

        // 定义解读步骤
        const steps = [
            { title: '梦境结构分析', duration: 1000 },
            { title: '核心意象识别', duration: 1500 },
            { title: '心理动力解读', duration: 2000 },
            { title: '原型分析', duration: 1500 },
            { title: '个人关联探索', duration: 1000 }
        ];

        // 逐步显示分析过程
        for (let i = 0; i < steps.length; i++) {
            await this.showAnalysisStep(steps[i], i + 1);
            this.updateProgress((i + 1) * (100 / steps.length));
        }

        // 创建可视化图表
        this.createEmotionWave();
        this.createImageryMap();
        this.createThemeElements();
    }

    // 续写过程可视化
    async visualizeWriting(fragmentText) {
        const writingProcess = document.querySelector('.writing-process');
        writingProcess.style.display = 'block';
        
        this.updateProgress(0);
        
        // 创建故事流动画
        this.createStoryFlow();
        
        // 创建情感轨迹
        this.createEmotionTrack();
        
        // 创建符号云
        this.createSymbolCloud();
        
        // 模拟写作进度
        for (let i = 0; i <= 100; i += 10) {
            await this.sleep(200);
            this.updateProgress(i);
        }
    }

    // 创建情感波动图
    createEmotionWave() {
        const canvas = document.querySelector('.wave-canvas');
        const ctx = canvas.getContext('2d');
        
        if (this.emotionChart) {
            this.emotionChart.destroy();
        }

        this.emotionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['开始', '发展', '转折', '高潮', '结束'],
                datasets: [{
                    label: '情感强度',
                    data: [30, 45, 65, 85, 60],
                    borderColor: '#6a4c93',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 创建意象关系图
    createImageryMap() {
        const container = document.querySelector('.imagery-map');
        container.innerHTML = '';

        const width = container.clientWidth;
        const height = container.clientHeight;

        const svg = d3.select('.imagery-map')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // 示例数据
        const nodes = [
            { id: 'center', name: '核心意象', r: 30 },
            { id: 'sub1', name: '关联1', r: 20 },
            { id: 'sub2', name: '关联2', r: 20 },
            { id: 'sub3', name: '关联3', r: 20 }
        ];

        const links = [
            { source: 'center', target: 'sub1' },
            { source: 'center', target: 'sub2' },
            { source: 'center', target: 'sub3' }
        ];

        // 创建力导向图
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2));

        // 绘制连线
        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .style('stroke', '#999')
            .style('stroke-opacity', 0.6);

        // 绘制节点
        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', d => d.r)
            .style('fill', '#6a4c93')
            .style('fill-opacity', 0.7);

        // 添加文本标签
        const text = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .text(d => d.name)
            .attr('font-size', '12px')
            .attr('text-anchor', 'middle');

        // 更新位置
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            text
                .attr('x', d => d.x)
                .attr('y', d => d.y + 30);
        });
    }

    // 创建主题元素
    createThemeElements() {
        const container = document.querySelector('.theme-elements');
        container.innerHTML = '';

        const themes = [
            '个人成长',
            '人际关系',
            '内在冲突',
            '潜在愿望',
            '焦虑来源'
        ];

        themes.forEach(theme => {
            const element = document.createElement('div');
            element.className = 'theme-element';
            element.textContent = theme;
            container.appendChild(element);
        });
    }

    // 创建故事流动画
    createStoryFlow() {
        const container = document.querySelector('.story-flow');
        container.innerHTML = '';

        const flowSteps = [
            '场景展开',
            '情节发展',
            '转折点',
            '高潮构建',
            '结局呈现'
        ];

        flowSteps.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.className = 'process-step';
            stepElement.innerHTML = `
                <div class="step-header">
                    <div class="step-title">${step}</div>
                </div>
            `;
            container.appendChild(stepElement);
        });
    }

    // 创建情感轨迹
    createEmotionTrack() {
        const canvas = document.querySelector('.emotion-canvas');
        const ctx = canvas.getContext('2d');

        if (this.emotionChart) {
            this.emotionChart.destroy();
        }

        this.emotionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['起点', '发展1', '发展2', '转折', '高潮', '结局'],
                datasets: [{
                    label: '情感强度',
                    data: [20, 35, 45, 75, 90, 60],
                    borderColor: '#6a4c93',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 创建符号云
    createSymbolCloud() {
        const container = document.querySelector('.symbol-cloud');
        container.innerHTML = '';

        const symbols = [
            '光明', '黑暗', '水', '火', '山',
            '树', '鸟', '门', '路', '星'
        ];

        symbols.forEach(symbol => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = symbol;
            container.appendChild(tag);
        });
    }

    // 切换可视化视图
    switchView(view) {
        const content = document.querySelector('.visualization-content');
        content.querySelectorAll('div').forEach(div => div.style.display = 'none');

        switch (view) {
            case 'emotion':
                content.querySelector('.emotion-wave').style.display = 'block';
                this.createEmotionWave();
                break;
            case 'imagery':
                content.querySelector('.imagery-map').style.display = 'block';
                this.createImageryMap();
                break;
            case 'theme':
                content.querySelector('.theme-elements').style.display = 'block';
                break;
        }
    }

    // 显示分析步骤
    async showAnalysisStep(step, index) {
        const stepsContainer = document.querySelector('.process-steps');
        
        const stepElement = document.createElement('div');
        stepElement.className = 'process-step';
        stepElement.innerHTML = `
            <div class="step-header">
                <div class="step-number">${index}</div>
                <div class="step-title">${step.title}</div>
            </div>
            <div class="step-content">正在分析...</div>
        `;
        
        stepsContainer.appendChild(stepElement);
        
        await this.sleep(step.duration);
        stepElement.classList.add('active');
    }

    // 更新进度条
    updateProgress(percentage) {
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${percentage}%`;
    }

    // 工具函数：睡眠
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 创建可视化实例
window.dreamVisualization = new DreamVisualization(); 