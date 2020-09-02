"use strict";

class SequenceUI
{
    current_index = 0;

    constructor()
    {
        this.update();
        
        document.getElementById("sequence").onclick = (e) => {
            var idx = e.target.parentElement.index;
            if (typeof(idx) == "undefined") return;

            this.setCurrentSequenceIndex(idx);
            ui.tracker.loadPattern(song.sequence[idx]);
            ui.tracker.setSelectedRow(0);
        }
    }

    update()
    {
        var sequence = document.getElementById("sequence");
        while(sequence.children.length > 1)
            sequence.children[1].remove();
        for(var idx=0; idx<song.sequence.length; idx++)
        {
            var row_node = document.createElement("tr");
            row_node.index = idx;
            var cell_node = document.createElement("td");
            cell_node.innerText = (idx + 1);
            row_node.appendChild(cell_node);
            cell_node = document.createElement("td");
            cell_node.innerText = song.sequence[idx];
            cell_node.contentEditable = true;
            cell_node.oninput = (e) => {
                var new_text = e.target.innerText.replace(/[^\d]/, '');
                if (e.target.innerText != new_text) e.target.innerText = new_text;
                var value = parseInt(new_text) || 0;
                song.sequence[e.target.parentElement.index] = value;
                this.updatePatternHighlight();
                ui.tracker.loadPattern(value);
                ui.tracker.setSelectedRow(0);
            }
            row_node.appendChild(cell_node);
            sequence.appendChild(row_node);
        }
        
        this.updatePatternHighlight();
    }
    
    setCurrentSequenceIndex(index)
    {
        this.current_index = index;
        this.updatePatternHighlight();
    }

    updatePatternHighlight()
    {
        var sequence = document.getElementById("sequence");
        for(var idx=0; idx<song.sequence.length; idx++)
        {
            if (song.sequence[idx] == song.sequence[this.current_index])
                sequence.children[idx+1].classList.add("highlight");
            else
                sequence.children[idx+1].classList.remove("highlight");
            if (idx == this.current_index)
                sequence.children[idx+1].classList.add("active");
            else
                sequence.children[idx+1].classList.remove("active");
        }
    }
};