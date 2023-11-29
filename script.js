// Incluindo dependências:
const assert = require('assert');
const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const sleep = require('sleep');

// Função assíncrona executada:
async function Teste1() {
    // Configurar o navegador Chrome
    const options = new chrome.Options();
    options.addArguments('start-maximized'); // Maximizar a janela do navegador

    // Criar o WebDriver
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    // Inicializar um objeto para armazenar os resultados do teste
    const testResults = {
        assertions: [],
        success: true,
    };

    try {
        // Comunicar
        console.log('\nIniciando Teste 1!');

        // Comunicar
        console.log('\nAbrindo Chrome...');

        // Navegar até o Google
        await driver.get('https://www.google.com');

        // Comunicar
        console.log('\nPesquisando...');

        // Selecionar campo de busca
        const buscaInput = await driver.findElement(By.name('q'));

        // Digitar na barra de pesquisa
        buscaInput.sendKeys('Little-Host GitHub', Key.RETURN);

        // Aguardar
        sleep.sleep(1);

        // Aguardar até que a página de resultados seja carregada
        await driver.wait(until.titleContains('GitHub'), 5000);

        // Pegar título da página
        var pageTitle = await driver.getTitle();

        // Gravar título da página no log
        testResults.assertions.push('Pesquisa Executada: ' + pageTitle);

        // Obter primeiro link da pesquisa
        const firstResult = await driver.findElement(By.css('h3'));

        // Pegar o texto da primeira pesquisa
        const firstResultText = await firstResult.getText();

        // Verificar se o primeiro resultado da pesquisa contém 'juan9321/Little-Host' e gravar no log
        assert.ok(firstResultText.includes('juan9321/Little-Host'), 'O primeiro resultado não contém "juan9321/Little-Host".');
        testResults.assertions.push('O primeiro resultado contém "juan9321/Little-Host".');

        // Comunicar
        console.log('\nRedirecionando para o projeto Little-Host...');

        // Clicando no primeiro resultado
        await firstResult.click();

        // Aguardar até que a página do Github seja carregada
        await driver.wait(until.titleContains('juan9321/Little-Host'), 5000);

        // Pegar o título da página
        pageTitle = await driver.getTitle();

        // Gravar no log o título da página
        testResults.assertions.push('Título: ' + pageTitle);

        // Aguardar
        sleep.sleep(10);

        // Comunicar
        console.log('\nTeste Finalizado!\n');
    } catch (error) {
        console.error('Erro:', error.message);
        testResults.success = false;
        testResults.error = error.message;
    } finally {
        // Fechar o navegador ao finalizar o teste
        await driver.quit();

        // Gravar os resultados em um arquivo de log
        fs.writeFileSync('test-log.txt', JSON.stringify(testResults, null, 2));
    }
}

// Chamar a função para executar o teste
Teste1();
