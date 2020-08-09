-- User Interface

-- Use this function to perform your initial setup
function setup()
    print("Hello World!")

    local bg = readImage(asset.builtin.UI.Blue_Button11)
    button1 = imageButton(WIDTH/2-200,HEIGHT/2-100,400,200,bg, true)
end

function imageButton(x,y,w,h,i,f)
    local button = ui.button
    {
        x=x,
        y=y,
        w=w,
        h=h,
        opaque=false,
        text = "UI",
        fontSize = 100,
        normalBg = i,
        highlightedBg = asset.builtin.UI.Blue_Button10,
        normalFill = color(255, 255, 255, 255),
        align = {h = ui.CENTER, v = ui.CENTER},
        inset = 10
    }

    return button
end

-- This function gets called once every frame
function draw()
    -- This sets a dark background color
    background(40, 40, 50)

    -- This sets the line thickness
    strokeWidth(5)

    -- Do your drawing here
    button1:update()
    button1:draw()

    --button2:update()
    --button2:draw()
end
