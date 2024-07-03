(function() {
    const extensionId = location.href.split('/').pop().split('?')[0];
    const manifestUrl = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx2,crx3&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = manifestUrl;

    iframe.onload = function() {
        const responseUrl = iframe.contentWindow.location.href;
        if (responseUrl.includes('.crx')) {
            const a = document.createElement('a');
            a.href = responseUrl;
            a.download = `${extensionId}.crx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log('Download avviato per l\'estensione:', extensionId);
        } else {
            console.error('Errore durante il download del file .crx');
        }
        document.body.removeChild(iframe);
    };

    iframe.onerror = function() {
        console.error('Errore: impossibile caricare l\'iframe.');
        document.body.removeChild(iframe);
    };
})();
