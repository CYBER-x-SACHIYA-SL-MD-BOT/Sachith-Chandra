// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Vanilla Tilt for 3D effect
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Particles.js Background
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Hover effect on links and buttons
document.querySelectorAll('a, button, .social-icon, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounting = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
};

// Start counting when stats section is in view
const statsSection = document.querySelector('.stats-section');
let countingStarted = false;

window.addEventListener('scroll', () => {
    const statsPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (statsPosition < screenPosition && !countingStarted) {
        startCounting();
        countingStarted = true;
    }
});

// Task Management
let tasks = [];

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    displayTasks();
    updateProgress();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        showNotification('කරුණාකර කාර්යයක් ඇතුළත් කරන්න', 'error');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    
    tasks.push(task);
    saveTasks();
    displayTasks();
    updateProgress();
    taskInput.value = '';
    
    // Add animation to new task
    showNotification('කාර්යය සාර්ථකයි!', 'success');
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    displayTasks();
    updateProgress();
    showNotification('කාර්යය මකා දමන ලදී', 'info');
}

function toggleTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        displayTasks();
        updateProgress();
        
        if (task.completed) {
            showNotification('කාර්යය සම්පූර්ණයි! 🎉', 'success');
        }
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.sort((a, b) => a.completed - b.completed).forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed-task' : '';
        li.style.background = task.completed ? 'linear-gradient(135deg, #d4edda, #c3e6cb)' : 'rgba(255, 255, 255, 0.9)';
        
        const taskContent = document.createElement('div');
        taskContent.style.display = 'flex';
        taskContent.style.alignItems = 'center';
        taskContent.style.gap = '10px';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.style.textDecoration = task.completed ? 'line-through' : 'none';
        taskText.style.color = task.completed ? '#155724' : '#333';
        taskText.style.flex = '1';
        taskText.style.cursor = 'pointer';
        taskText.onclick = () => toggleTask(task.id);
        
        const taskDate = document.createElement('small');
        taskDate.textContent = task.createdAt || '';
        taskDate.style.color = '#666';
        taskDate.style.fontSize = '12px';
        taskDate.style.marginLeft = '10px';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = 'delete-btn';
        deleteBtn.style.padding = '8px 12px';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);
        taskContent.appendChild(taskDate);
        
        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        
        // Add animation
        li.style.animation = 'slideInRight 0.5s ease';
    });
    
    updateTaskStats();
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = `${Math.round(progress)}%`;
    }
}

function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    document.getElementById('totalTasks').textContent = `මුළු කාර්ය: ${totalTasks}`;
    document.getElementById('completedTasks').textContent = `සම්පූර්ණ කළ: ${completedTasks}`;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 3000);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth Scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image hover effect
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        img.style.transform = `scale(1.1) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });
});
