(function(){

    var body = document.querySelector('body'),
        elements = {
            cropArea  : document.createElement('div'),
            fileInput : document.createElement('input'),
            dropArea  : document.createElement('div')
        },
        closedElements = [],
        closedElementTagNames = [
            'area',
            'base',
            'br',
            'col',
            'command',
            'embed',
            'hr',
            'img',
            'input',
            'keygen',
            'link',
            'meta',
            'param',
            'source',
            'track',
            'wbr'
        ];

    closedElementTagNames.forEach(function(tagName, index){
        closedElements.push(document.createElement(tagName));
    });

    describe("Settings Module", function(){

        it("will error when no element is available to upload a file.", function(){
            expect(function(){
                settings.bindSettings(elements.cropArea,{});
            }).toThrowError(TypeError, "CropResize is unable to operate without a 'fileInput' or 'dropArea' element.");
        });

        it("'bindSettings()' will error when 'fileInput' is not an input of type 'file'",function(){
            expect(function(){
                settings.bindSettings(elements.cropArea,{
                    fileInput:elements.fileInput
                });
            }).toThrowError(TypeError);
        });

        it("will error if 'dropArea' is a closed tag element.", function(){
            closedElements.forEach(function(element){
                expect(function(){
                    settings.bindSettings(elements.cropArea,{
                        dropArea:element
                    });
                }).toThrowError(TypeError);
            });
        });

        //TODO:Jasmine test don't seem to have a body?
        it("will error if 'dropArea' is not an element in the DOM.", function(){
            expect(function(){
                settings.bindSettings(elements.cropArea,{
                    dropArea:elements.dropArea
                });
            }).toThrowError(TypeError, "Invalid 'cropArea' element supplied to cropResize. Please ensure element is available in the DOM.");
        });

        it("will error if 'setRatio' uses a string without two separate numeric values", function(){
            expect(function(){
                settings.bindSettings(elements.cropArea,{
                    fileInput:elements.fileInput,
                    setRatio:""
                })
            }).toThrowError(TypeError);
        });

    });
})();